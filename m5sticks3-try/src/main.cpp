#include <M5Unified.h>

void setup() {
  M5.begin();

  // 回転
  M5.Display.setRotation(1);

  M5.Display.setTextSize(5);
  M5.Display.setCursor(20, 20);

  M5.Lcd.println("aaa");

  // delay(7000);
  // M5.Display.sleep();
  // M5.Power.powerOff();
}

// see https://docs.m5stack.com/ja/arduino/m5sticks3/button
void loop() {
  M5.delay(1);
  M5.update();

  // 正面についているボタン
  if (M5.BtnA.isPressed()) {
    M5.Lcd.println("ButtonA clicked");
  }
  // 右脇のボタン
  if (M5.BtnB.isPressed()) {
    M5.Lcd.println("ButtonB clicked");
  }
}
