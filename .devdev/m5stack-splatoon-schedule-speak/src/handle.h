#pragma once
#include <M5Unified.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include "player/player.h"
#include "vars.hpp"

String fetchSchedule();
void parseSchedule(const char* payload);
