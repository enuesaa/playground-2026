#include <M5Unified.h>
#include <time.h>

// 音声データ
// xxd -i desu.wav > desu.h
#include "speak/currenttimeis.h"
#include "speak/desu.h"
#include "speak/number0.h"
#include "speak/number1.h"
#include "speak/number2.h"
#include "speak/number3.h"
#include "speak/number4.h"
#include "speak/number5.h"
#include "speak/number6.h"
#include "speak/number7.h"
#include "speak/number8.h"
#include "speak/number9.h"

// 数字テーブル
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
  if (n >= 0 && n <= 9) {
    play(numbers[n].data, numbers[n].len);
  }
}

void playTime(int hour, int minute) {
  play(currenttimeis_wav, currenttimeis_wav_len);

  if (hour > 9) {
    playNumber(hour/10);
  }
  playNumber(hour%10);

  if (minute >= 10) {
    playNumber(minute/10);
  }
  playNumber(minute%10);
  play(desu_wav, desu_wav_len);
}
