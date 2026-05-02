#include <M5Unified.h>
#include <WiFi.h>
#include <NTPClient.h>
#include "vars.hpp"

WiFiUDP ntpUDP;
NTPClient ntp(ntpUDP, "pool.ntp.org", 9 * 3600);
String schedule;

void setup() {
  M5.begin();
  M5.Speaker.setVolume(150);
  M5.Speaker.setAllChannelVolume(150);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    M5.delay(1000);
  }
  ntp.begin();
  ntp.update();

  int hour = ntp.getHours();
  int minute = ntp.getMinutes();
  M5.Lcd.setTextSize(6);
  M5.Display.printf("%d %d\n", hour, minute);
  M5.Display.printf("bbb\n");
}

void loop() {
  M5.delay(5000);
}
