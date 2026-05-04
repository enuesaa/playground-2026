#pragma once

#include <M5Unified.h>

namespace network {
    bool connectWiFi();
    bool connectMQTT();
    bool publish(const char* topic, const char* payload);
}; // namespace network
