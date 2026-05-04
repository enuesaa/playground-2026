#include <M5Unified.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include "vars.hpp"
#include "base64.hpp"
#include "ui.hpp"

WiFiUDP ntpUDP;
WiFiClientSecure net;
PubSubClient mqtt(net);

static int16_t rec_buffer[16000 * 3];

void generate_session_id(char* out, size_t length) {
  const char charset[] = "abcdefghijklmnopqrstuvwxyz0123456789";
  size_t charset_len = sizeof(charset) - 1;

  for (size_t i = 0; i < length; i++) {
    out[i] = charset[esp_random() % charset_len];
  }
  out[length] = '\0';
}

void setup() {
  M5.begin();
  M5.Mic.begin();
  M5.Lcd.setTextSize(3);
  M5.Speaker.setVolume(150);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    M5.delay(1000);
  }
  M5.Display.println("wifi ok");

  net.setCACert(AWSIOT_ROOT_CA);
  net.setCertificate(AWSIOT_CERTIFICATE);
  net.setPrivateKey(AWSIOT_PRIVATE_KEY);
  mqtt.setServer(AWSIOT_ENDPOINT, 8883);
  mqtt.setBufferSize(2048);

  while (!mqtt.connected()) {
    if (!mqtt.connect(AWSIOT_THING_ID)) {
      M5.delay(1000);
    }
  }
  M5.Display.println("MQTT OK");
  mqtt.publish("debug", "hello");

  M5.Display.println("Start in 2 sec...");
  M5.delay(2000);

  M5.Display.println("Recording 3 sec...");
  M5.Mic.record(rec_buffer, 16000 * 3, 16000);
  M5.delay(3000);
  M5.Display.println("Record done");
  
  int samples = 16000 * 3;
  int totalBytes = samples * 2;
  int chunkSize = 1024;
  uint8_t* ptr = (uint8_t*)rec_buffer;
  unsigned char b64buf[1600];
  mqtt.publish("debug", "start");

  char session[11];
  generate_session_id(session, 10);

  // だいたい93チャンク
  for (int i = 0; i < totalBytes; i += chunkSize) {
    int size = min(chunkSize, totalBytes - i);
    unsigned int out_len = encode_base64(ptr+i, size, b64buf);
    char payload[1500];
    snprintf(payload, sizeof(payload), "{\"seq\":%d,\"session\":\"%s\",\"data\":\"%s\"}", i / chunkSize, session, b64buf);

    bool ok = mqtt.publish("m5/audio/chunk", payload);
    if (!ok) {
      M5.Display.printf("publish failed at seq=%d\n", i / chunkSize);
    }
    M5.delay(10);
  }

  char end_payload[64];
  snprintf(end_payload, sizeof(end_payload), "{\"session\":\"%s\"}", session);
  mqtt.publish("m5/audio/end", end_payload);
  M5.Display.println("Publish done");
}

ui::Button btn(100, 80, 120, 60, "OK");
ui::StatusArea status(20, 160, 280, 60);

void loop() {
  M5.update();

    auto t = M5.Touch.getDetail();

    if (t.wasPressed()) {
        if (btn.contains(t.x, t.y)) {
            btn.pressed = true;
            btn.draw();

            status.setText("Button pressed");
        }
    }

    if (t.wasReleased()) {
        if (btn.pressed) {
            btn.pressed = false;
            btn.draw();

            status.setText("Released");
        }
    }
}
