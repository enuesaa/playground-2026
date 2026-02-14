#include <M5Unified.h>

void setup() {
  M5.begin();
}

void loop() {
  M5.Speaker.tone(800, 200);
  M5.delay(200);
  M5.delay(10000);
}
