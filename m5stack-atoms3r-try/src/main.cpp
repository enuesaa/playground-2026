#include <M5Unified.h>
#include "SPIFFS.h"

void setup() {
  M5.begin();
  // M5.Speaker.setVolume(50);
  // M5.Speaker.setAllChannelVolume(50);

  M5.Speaker.tone(800, 200);
  M5.delay(500);

  if (!SPIFFS.begin(true)) {
    return;
  }
  if (!SPIFFS.exists("/hello.wav")) {
    M5.Speaker.tone(800, 200);
    M5.delay(500);
    return;
  }

  File wavFile = SPIFFS.open("/hello.wav");
  if (!wavFile) {
    return;
  }
  static uint8_t buf[46000];
  int len = wavFile.read(buf, sizeof(buf));
  M5.Speaker.playWav(buf, len);
    
  while (M5.Speaker.isPlaying()) {
    delay(1);
  }
}

void loop() {
}
