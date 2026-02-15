#include <M5Unified.h>
#include "assets/amaart.h"
#include "assets/gonzui.h"
#include "assets/kinmedai.h"
#include "assets/mahimahi.h"
#include "assets/mategai.h"
#include "assets/nampla.h"
#include "assets/namerou.h"
#include "assets/kusaya.h"
#include "assets/takaashi.h"
#include "assets/track.h"
#include "assets/yunohana.h"
#include "assets/hiramegaoka.h"
#include "assets/mantamaria.h"
#include "assets/masaba.h"
#include "assets/kaiun.h"
#include "assets/chouzame.h"
#include "assets/world.h"
#include "assets/taraport.h"
#include "assets/yagara.h"
#include "assets/zatou.h"
#include "assets/unknown.h"
#include "assets/koukashita.h"

struct StageWavData {
  const char* stageName;
  const uint8_t* data;
  size_t len;
};

StageWavData stageWavs[] = {
  {"ユノハナ大渓谷", yunohana_wav, yunohana_wav_len},
  {"ゴンズイ地区",   gonzui_wav, gonzui_wav_len},
  {"ヤガラ市場",     yagara_wav, yagara_wav_len},
  {"マテガイ放水路", mategai_wav, mategai_wav_len},
  {"ナンプラー遺跡", nampla_wav, nampla_wav_len},
  {"ナメロウ金属",   namerou_wav, namerou_wav_len},
  {"クサヤ温泉",     kusaya_wav, kusaya_wav_len},
  {"タラポートショッピングパーク", taraport_wav, taraport_wav_len},
  {"ヒラメが丘団地", hiramegaoka_wav, hiramegaoka_wav_len},
  {"マサバ海峡大橋", masaba_wav, masaba_wav_len},
  {"キンメダイ美術館", kinmedai_wav, kinmedai_wav_len},
  {"マヒマヒリゾート＆スパ", mahimahi_wav, mahimahi_wav_len},
  {"海女美術大学",    amaart_wav, amaart_wav_len},
  {"チョウザメ造船", chouzame_wav, chouzame_wav_len},
  {"ザトウマーケット", zatou_wav, zatou_wav_len},
  {"スメーシーワールド", world_wav, world_wav_len},
  {"コンブトラック",   track_wav, track_wav_len},
  {"マンタマリア号",   mantamaria_wav, mantamaria_wav_len},
  {"タカアシ経済特区", takaashi_wav, takaashi_wav_len},
  {"オヒョウ海運",     kaiun_wav, kaiun_wav_len},
  {"デカライン高架下", koukashita_wav, koukashita_wav_len},
};

const StageWavData* getStageWav(const char* stageName) {
  for (int i = 0; i < sizeof(stageWavs)/sizeof(stageWavs[0]); i++) {
    if (strcmp(stageWavs[i].stageName, stageName) == 0) {
      return &stageWavs[i];
    }
  }
  return nullptr;
}


void playStage(const char* stageName) {
  const StageWavData* wav = getStageWav(stageName);
  if (!wav) {
    static const StageWavData unknown = {"不明", unknown_wav, unknown_wav_len};
    wav = &unknown;
  }
  M5.Speaker.playWav(wav->data, wav->len);
  while (M5.Speaker.isPlaying()) {
    delay(10);
  }
}
