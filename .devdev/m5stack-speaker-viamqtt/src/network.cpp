#include "network.hpp"
#include "vars.hpp"
#include <PubSubClient.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>

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
}; // namespace network
