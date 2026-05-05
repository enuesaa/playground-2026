#pragma once

#include <M5Unified.h>

namespace network {
    bool connectWiFi();
    bool connectMQTT();
    bool publish(const char* topic, const char* payload);
    void genMsid(char *out);
    bool publishAudioChunkMessage(const char *msid, int seq, unsigned char* data);
    bool publishAudioEndMessage(const char *msid);
}; // namespace network
