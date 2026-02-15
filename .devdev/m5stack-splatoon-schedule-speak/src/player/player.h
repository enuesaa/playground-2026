#pragma once
#include <M5Unified.h>

namespace player {
  void play(const uint8_t *data, size_t len);
  void playNumber(int n);
  void playTime(int hour, int minute);
  void playStage(const char *stageName);
};
