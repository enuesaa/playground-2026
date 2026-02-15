#include "player.h"
#include "assets/currenttimeis.h"
#include "assets/desu.h"

namespace player {
  void playTime(int hour, int minute) {  
    play(currenttimeis_wav, currenttimeis_wav_len);
    playNumber(hour);
    playNumber(minute);
    play(desu_wav, desu_wav_len);
  }
};
