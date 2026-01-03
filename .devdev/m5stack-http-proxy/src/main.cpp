#include <M5Unified.h>
#include <WiFi.h>
#include <HTTPClient.h>

void setup() {
  M5.begin();
  M5.Display.setTextSize(2);

  M5.Display.println("start");
  WiFi.begin("", "");
  while (WiFi.status() != WL_CONNECTED) delay(100);

  M5.Display.println("conected");

  Serial2.begin(921600, SERIAL_8N1, 18, 17);
  M5.Display.println("ready");
}

void loop() {
  if (!Serial2.available()) return;

  String url = Serial2.readStringUntil('\n');
  url.trim();
  if (url.length() == 0) return;

  HTTPClient http;
  http.begin(url);
  int code = http.GET();
  String body = http.getString();
  http.end();

  Serial2.println(body);
  M5.Display.println("ok");
}
