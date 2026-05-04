#include "network.hpp"
#include "vars.hpp"
#include <PubSubClient.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>

WiFiClientSecure net;
PubSubClient mqtt(net);

namespace network {
    bool connectWiFi() {
        WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
        for (int i = 0; i < 10; ++i) {
            if (WiFi.status() == WL_CONNECTED) {
                return true;
            }
            M5.delay(1000);
        }
        return false;
    };

    bool connectMQTT() {
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
        for (int i = 0; i < 5; ++i) {
            if (mqtt.connected()) {
                return true;
            }
            if (!mqtt.connect(AWSIOT_THING_ID)) {
                M5.delay(500);
            }
        }
        return false;
    }

    bool publish(const char* topic, const char* payload) {
        return mqtt.publish(topic, payload);
    }

    void genMsid(char *out) {
        const char charset[] = "abcdefghijklmnopqrstuvwxyz0123456789";
        size_t charset_len = sizeof(charset) - 1;

        for (size_t i = 0; i < 10; i++) {
            out[i] = charset[esp_random() % charset_len];
        }
        out[10] = '\0';
    }

    bool publishAudioChunkMessage(const char *msid, int seq, unsigned char* data) {
        char payload[1600];
        snprintf(payload, sizeof(payload), "{\"seq\":%d,\"msid\":\"%s\",\"data\":\"%s\"}", seq, msid, data);
        return network::publish("m5/audio/chunk", payload);
    }

    bool publishAudioEndMessage(const char *msid) {
        char end_payload[64];
        snprintf(end_payload, sizeof(end_payload), "{\"mid\":\"%s\"}", msid);
        return mqtt.publish("m5/audio/end", end_payload);
    }
}; // namespace network
