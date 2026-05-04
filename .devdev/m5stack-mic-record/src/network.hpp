#pragma once

#include <M5Unified.h>
#include <PubSubClient.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include "vars.hpp"

namespace network {
    bool connectWiFi();
    bool connectMQTT();
    bool publish(const char* topic, const char* payload);
}; // namespace network
