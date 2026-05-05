#pragma once

#include <PubSubClient.h>
#include <M5Unified.h>
#include <ArduinoJson.h>

namespace audiooutput {
    void setup(PubSubClient& mqtt);
    void callback(char* topic, byte* payload, unsigned int length);
}
