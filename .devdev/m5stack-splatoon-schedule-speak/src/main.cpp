#include <M5Unified.h>
#include "speak.h"

void setup() {
  M5.begin();
  M5.Speaker.setVolume(180);
  M5.Speaker.setAllChannelVolume(180);

  M5.Speaker.tone(800, 200);
  M5.delay(500);

  playTime(10, 57);

  // M5.Speaker.playWav(hello_wav, hello_wav_len);
  // while (M5.Speaker.isPlaying()) {
  //   delay(1);
  // }
}

void loop() {
}
