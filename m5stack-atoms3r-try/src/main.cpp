#include <M5Unified.h>

void setup() {
  M5.begin();
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
