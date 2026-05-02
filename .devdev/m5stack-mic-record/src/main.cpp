#include <M5Unified.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include "vars.hpp"

WiFiUDP ntpUDP;
WiFiClientSecure net;
PubSubClient client(net);

static int16_t rec_buffer[16000 * 3];

void setup() {
  M5.begin();
  M5.Mic.begin();
  M5.Speaker.setVolume(150);

  M5.Lcd.setTextSize(3);
  M5.Display.println("Start in 2 sec...");
  M5.delay(2000);

  M5.Display.println("Recording 3 sec...");
  int is = M5.Mic.record(rec_buffer, 16000 * 3, 16000);
  M5.delay(3000);
  M5.Display.println("Record done");

  M5.delay(2000);
  M5.Display.println("Playing...");
  M5.Speaker.playRaw((const int16_t*)rec_buffer, 16000 * 3, 16000);
  M5.Display.println("Done");
}

void loop() {
  M5.delay(1000);
}
