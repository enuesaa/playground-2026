#include <M5Unified.h>

uint16_t greenColor = M5.Lcd.color565(33, 143, 105);

void setup() {
  M5.begin();

  // 回転
  M5.Display.setRotation(1);

  // クリア
  M5.Lcd.clear();
  M5.Lcd.fillScreen(greenColor);
  M5.Lcd.setTextColor(WHITE, greenColor);

  // 文字表示
  // https://qiita.com/tomoto335/items/9bb4427d6eb8e993b185
  // https://lang-ship.com/reference/unofficial/M5StickC/Tips/M5Display/
  M5.Display.setCursor(15, 5);
  M5.Display.setTextSize(1);
  M5.Display.setTextFont(7); // 数字フォント
  M5.Lcd.println("012");

  M5.Display.setCursor(15, 60);
  M5.Display.setTextSize(3);
  M5.Display.setTextFont(1); // テキストフォント
  M5.Lcd.println("aaa");

  M5.Display.setCursor(190, 13);
  M5.Lcd.printf("%d%%", M5.Power.getBatteryLevel()); // バッテリー残量

  // delay(7000);
  // M5.Power.powerOff();
}

// see https://docs.m5stack.com/ja/arduino/m5sticks3/button
void loop() {
  M5.update();

  // 正面についているボタン (ボタンを押している最中か)
  if (M5.BtnA.isPressed()) {
    M5.Lcd.println("ButtonA clicked");
  }
  // 右脇のボタン
  if (M5.BtnB.isPressed()) {
    M5.Lcd.println("ButtonB clicked");
  }

  M5.delay(10);
}
