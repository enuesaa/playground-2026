#include "player.hpp"
#include "assets/currenttimeis.hpp"
#include "assets/desu.hpp"
#include "assets/mock.hpp"

namespace player {
  void play(const uint8_t *data, size_t len) {
    M5.Speaker.playWav(data, len);
    while (M5.Speaker.isPlaying()) {
      delay(10);
    }
  }

  void playTime(int hour, int minute) {
    play(currenttimeis_wav, currenttimeis_wav_len);
    playNumber(hour);
    playNumber(minute);
    play(desu_wav, desu_wav_len);
  }

  void playMock() {
    play(mock_wav, mock_wav_len);
  }
};
