#include <M5Unified.h>
#include "assets/currenttimeis.h"
#include "assets/desu.h"
#include "assets/number0.h"
#include "assets/number1.h"
#include "assets/number2.h"
#include "assets/number3.h"
#include "assets/number4.h"
#include "assets/number5.h"
#include "assets/number6.h"
#include "assets/number7.h"
#include "assets/number8.h"
#include "assets/number9.h"

struct WavData {
  const uint8_t* data;
  size_t len;
};

WavData numbers[] = {
  { number0_wav, number0_wav_len },
  { number1_wav, number1_wav_len },
  { number2_wav, number2_wav_len },
  { number3_wav, number3_wav_len },
  { number4_wav, number4_wav_len },
  { number5_wav, number5_wav_len },
  { number6_wav, number6_wav_len },
  { number7_wav, number7_wav_len },
  { number8_wav, number8_wav_len },
  { number9_wav, number9_wav_len },
};

void play(const uint8_t* data, size_t len) {
  M5.Speaker.playWav(data, len);
  while (M5.Speaker.isPlaying()) {
    delay(10);
  }
}

void playNumber(int n) {
  if (n < 0) {
    return;
  }
  if (n <= 9) {
    play(numbers[n].data, numbers[n].len);
    return;
  }
  playNumber(n / 10);
  playNumber(n % 10);
}

void playTime(int hour, int minute) {
  play(currenttimeis_wav, currenttimeis_wav_len);
  playNumber(hour);
  playNumber(minute);
  play(desu_wav, desu_wav_len);
}
