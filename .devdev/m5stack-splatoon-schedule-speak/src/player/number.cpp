#include "player.hpp"
#include "assets/number0.hpp"
#include "assets/number1.hpp"
#include "assets/number2.hpp"
#include "assets/number3.hpp"
#include "assets/number4.hpp"
#include "assets/number5.hpp"
#include "assets/number6.hpp"
#include "assets/number7.hpp"
#include "assets/number8.hpp"
#include "assets/number9.hpp"

namespace player {
  struct AssetNumber {
    const uint8_t *data;
    size_t len;
  };

  AssetNumber numbers[] = {
      {number0_wav, number0_wav_len},
      {number1_wav, number1_wav_len},
      {number2_wav, number2_wav_len},
      {number3_wav, number3_wav_len},
      {number4_wav, number4_wav_len},
      {number5_wav, number5_wav_len},
      {number6_wav, number6_wav_len},
      {number7_wav, number7_wav_len},
      {number8_wav, number8_wav_len},
      {number9_wav, number9_wav_len},
  };

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
};
