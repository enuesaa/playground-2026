#include "ui.hpp"
#include "vars.hpp"
#include "network.hpp"
#include "audiooutput.hpp"

#include <M5Unified.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>

// ===== UI =====
ui::Button btn(100, 80, 120, 60, "OK");
ui::StatusArea status(20, 160, 280, 60);

// ===== MQTT =====
WiFiClientSecure net;
PubSubClient mqtt(net);

void setup() {
    M5.begin();
    M5.Lcd.setTextSize(3);
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
    mqtt.setCallback(audiooutput::callback);
    mqtt.setBufferSize(2048);

    while (!mqtt.connected()) {
        status.setText("MQTT connecting...");

        if (!mqtt.connect(AWSIOT_THING_ID)) {
            M5.delay(1000);
        }
    }
    status.setText("MQTT connected");

    audiooutput::setup(mqtt);
    status.setText("MQTT subscribed");
}

void loop() {
    M5.update();
    if (!mqtt.connected()) {
        status.setText("MQTT disconnected");
    }
    mqtt.loop();
}
