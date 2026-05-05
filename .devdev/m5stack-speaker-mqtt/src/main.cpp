#include "base64.hpp"
#include "ui.hpp"
#include "vars.hpp"
#include "network.hpp"

#include <M5Unified.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// ===== UI =====
ui::Button btn(100, 80, 120, 60, "OK");
ui::StatusArea status(20, 160, 280, 60);

// ===== MQTT =====
WiFiClientSecure net;
PubSubClient mqtt(net);

// ===== Audio =====
typedef struct {
    int16_t data[1024];
    size_t len;
} AudioChunk;

QueueHandle_t audioQueue;
volatile bool isPlaying = false;

// ===== MQTT callback =====
void callback(char* topic, byte* payload, unsigned int length) {
    JsonDocument doc;

    if (deserializeJson(doc, payload, length)) return;

    if (doc["data"].is<const char*>()) {
        const char* b64 = doc["data"];

        AudioChunk chunk;
        chunk.len = decode_base64((const unsigned char*)b64, strlen(b64), (uint8_t*)chunk.data);

        if (chunk.len > 0) {
            xQueueSend(audioQueue, &chunk, 0);
            isPlaying = true;
        }
    }
}

// ===== Audio Task =====
void audioTask(void* arg) {
    AudioChunk chunk;

    while (true) {
        if (!isPlaying) {
            vTaskDelay(10);
            continue;
        }
        while (M5.Speaker.isPlaying()) {
            vTaskDelay(1);
        }
        if (xQueueReceive(audioQueue, &chunk, 6)) {
            M5.Speaker.playRaw(chunk.data, chunk.len / 2, 16000, false, 1, -1, false);
        }

        if (uxQueueMessagesWaiting(audioQueue) == 0) {
            vTaskDelay(10);
            if (uxQueueMessagesWaiting(audioQueue) == 0) {
                isPlaying = false;
            }
        }
    }
}

// ===== Setup =====
void setup() {
    M5.begin();
    M5.Lcd.setTextSize(3);
    // auto config = M5.Speaker.config();
    // config.sample_rate = 44100;
    // M5.Speaker.config(config);
    M5.Speaker.setVolume(130);
    M5.Speaker.begin();

    btn.draw();
    status.setText("Initializing...");

    if (!network::connectWiFi()) {
        status.setText("WiFi failed");
        return;
    }

    net.setCACert(AWSIOT_ROOT_CA);
    net.setCertificate(AWSIOT_CERTIFICATE);
    net.setPrivateKey(AWSIOT_PRIVATE_KEY);

    mqtt.setServer(AWSIOT_ENDPOINT, 8883);
    mqtt.setCallback(callback);
    mqtt.setBufferSize(2048);

    while (!mqtt.connected()) {
        status.setText("MQTT connecting...");

        if (!mqtt.connect(AWSIOT_THING_ID)) {
            M5.delay(1000);
        }
    }
    status.setText("MQTT connected");

    mqtt.subscribe("m5/audio/output/chunk");
    mqtt.subscribe("m5/audio/output/end");
    status.setText("MQTT subscribed");

    audioQueue = xQueueCreate(60, sizeof(AudioChunk));
    xTaskCreatePinnedToCore(audioTask, "audio", 8192, NULL, 2, NULL, 1);
}

// ===== Loop =====
void loop() {
    M5.update();
    if (!mqtt.connected()) {
        status.setText("MQTT disconnected");
    }
    mqtt.loop();
}
