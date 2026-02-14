#include <M5Unified.h>
#include <WiFi.h>
#include <NTPClient.h>
#include <HTTPClient.h>
#include "speak.h"
#include "parse.h"
#include "vars.hpp"

WiFiUDP ntpUDP;
NTPClient ntp(ntpUDP, "pool.ntp.org", 9 * 3600);

void setup() {
  M5.begin();
  M5.Speaker.setVolume(150);
  M5.Speaker.setAllChannelVolume(150);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
  }
  ntp.begin();
  ntp.update();

  M5.Speaker.tone(800, 200);
  M5.delay(500);

  int hour   = ntp.getHours();
  int minute = ntp.getMinutes();
  playTime(hour, minute);

  // HTTPClient http;
  // http.begin(STAGE_API_URL);
  // int httpCode = http.GET();

  // String payload = http.getString();
  parseSchedule(MOCK_PAYLOAD);
}

void loop() {
}
