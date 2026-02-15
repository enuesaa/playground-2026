#include <M5Unified.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include "player/player.h"
#include "vars.hpp"

HTTPClient http;

const char* fetchSchedule() {
  http.begin(STAGE_API_URL);
  int code = http.GET();
  String resbody = http.getString();
  return resbody.c_str();
}

int getStartHour(const char *t) {
  if (t[11] == '2' && t[12] == '3') {
    return 23;
  }
  if (t[11] == '0' && t[12] == '1') {
    return 1;
  }
  if (t[11] == '0' && t[12] == '3') {
    return 3;
  }
  return -1;
}

void parseSchedule(const char* payload) {
  JsonDocument doc;
  deserializeJson(doc, payload);

  JsonArray results = doc["results"];

  for (JsonObject item : results) {
    const char *startTime = item["start_time"];
    if (!startTime) {
      continue;
    }
    int startHour = getStartHour(startTime);
    if (startHour < 0) {
      continue;
    }
    player::playNumber(startHour);

    JsonArray stages = item["stages"];
    if (stages.isNull() || stages.size() == 0) {
      continue;
    }
    player::playStage(stages[0]["name"]);
    player::playStage(stages[1]["name"]);
    M5.delay(500);
  }
}
