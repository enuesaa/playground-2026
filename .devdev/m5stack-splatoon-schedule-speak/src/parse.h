#include <M5Unified.h>
#include <ArduinoJson.h>
#include <time.h>
#include "speakstage.h"

int getStartHour(const char* t) {
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

void parseSchedule(String payload) {
  JsonDocument doc;
  deserializeJson(doc, payload);

  JsonArray results = doc["results"];

  for (JsonObject item : results) {
    const char* startTime = item["start_time"];
    if (!startTime) {
      continue; 
    }
    int startHour = getStartHour(startTime);
    if (startHour < 0) {
      continue;
    }
    playNumber(startHour);

    JsonArray stages = item["stages"];
    if (stages.isNull() || stages.size() == 0) {
      continue;
    }
    const char* stage1Name = stages[0]["name"];
    playStage(stage1Name);
    const char* stage2Name = stages[1]["name"];
    playStage(stage2Name);
  }
}
