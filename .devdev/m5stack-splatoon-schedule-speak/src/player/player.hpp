#pragma once
#include <M5Unified.h>

namespace player {
  void play(const uint8_t *data, size_t len);
  void playTime(int hour, int minute);
  void playMock();
  void playNumber(int n);
  void playStage(const char *stageName);
};
