#include <M5Unified.h>

void setup() {
  M5.begin();

  // 回転
  M5.Display.setRotation(1);

  M5.Display.setTextSize(8);
  M5.Display.setCursor(20, 20);

  M5.Lcd.println("aaa");

  delay(7000);
  M5.Display.sleep();
  M5.Power.powerOff();
}

void loop() {}
