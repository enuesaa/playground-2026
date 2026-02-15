#include "player.h"

namespace player {
  void play(const uint8_t* data, size_t len) {
    M5.Speaker.playWav(data, len);
    while (M5.Speaker.isPlaying()) {
      delay(10);
    }
  }
};
