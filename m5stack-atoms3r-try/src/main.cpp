#include <M5Unified.h>
#include <NTPClient.h>
#include <WiFi.h>

WiFiUDP ntpUDP;
NTPClient ntp(ntpUDP);

void setup() {
  M5.begin();

  WiFi.begin("", "");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
  }
  ntp.begin();
  ntp.update();

  M5.Speaker.tone(800, 200);
  M5.delay(500);
}

void loop() {
  M5.update();

  // 正面のボタン
  if (M5.BtnA.wasPressed()) {
    M5.Speaker.tone(800, 200);
    M5.delay(500);
  }
  M5.delay(10);
}
