#pragma once
#include <M5Unified.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include "player/player.hpp"
#include "vars.hpp"

String fetchSchedule();
void parseSchedule(String schedule);
