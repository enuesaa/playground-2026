#include <M5Unified.h>

#include "speakstage/amaart.h"
#include "speakstage/gonzui.h"
#include "speakstage/kinmedai.h"
#include "speakstage/mahimahi.h"
#include "speakstage/mategai.h"
#include "speakstage/nampla.h"
#include "speakstage/namerou.h"
#include "speakstage/kusaya.h"
#include "speakstage/takaashi.h"
#include "speakstage/track.h"
#include "speakstage/yunohana.h"
#include "speakstage/hiramegaoka.h"
#include "speakstage/mantamaria.h"
#include "speakstage/masaba.h"
#include "speakstage/kaiun.h"
#include "speakstage/chouzame.h"
#include "speakstage/world.h"
#include "speakstage/taraport.h"
#include "speakstage/yagara.h"
#include "speakstage/zatou.h"
#include "speakstage/unknown.h"
#include "speakstage/koukashita.h"

struct StageWavData {
  const uint8_t* data;
  size_t len;
};
struct StageAudio {
  int id;
  const char* stageName;
  StageWavData wav;
};

StageAudio stageAudios[] = {
  {1, "ユノハナ大渓谷", {yunohana_wav, yunohana_wav_len}},
  {2, "ゴンズイ地区",   {gonzui_wav, gonzui_wav_len}},
  {3, "ヤガラ市場",     {yagara_wav, yagara_wav_len}},
  {4, "マテガイ放水路", {mategai_wav, mategai_wav_len}},
  {5, "ナンプラー遺跡", {nampla_wav, nampla_wav_len}},
  {6, "ナメロウ金属",   {namerou_wav, namerou_wav_len}},
  {7, "クサヤ温泉",     {kusaya_wav, kusaya_wav_len}},
  {8, "タラポートショッピングパーク", {taraport_wav, taraport_wav_len}},
  {9, "ヒラメが丘団地", {hiramegaoka_wav, hiramegaoka_wav_len}},
  {10,"マサバ海峡大橋", {masaba_wav, masaba_wav_len}},
  {11,"キンメダイ美術館", {kinmedai_wav, kinmedai_wav_len}},
  {12,"マヒマヒリゾート＆スパ", {mahimahi_wav, mahimahi_wav_len}},
  {13,"海女美術大学",    {amaart_wav, amaart_wav_len}},
  {14,"チョウザメ造船", {chouzame_wav, chouzame_wav_len}},
  {15,"ザトウマーケット", {zatou_wav, zatou_wav_len}},
  {16,"スメーシーワールド", {world_wav, world_wav_len}},
  {17,"コンブトラック",   {track_wav, track_wav_len}},
  {18,"マンタマリア号",   {mantamaria_wav, mantamaria_wav_len}},
  {19,"タカアシ経済特区", {takaashi_wav, takaashi_wav_len}},
  {20,"オヒョウ海運",     {kaiun_wav, kaiun_wav_len}},
  {21,"デカライン高架下", {koukashita_wav, koukashita_wav_len}},
};

const StageWavData* getStageWav(const char* stageName) {
  for (int i = 0; i < sizeof(stageAudios)/sizeof(stageAudios[0]); i++) {
    if (strcmp(stageAudios[i].stageName, stageName) == 0) {
      return &stageAudios[i].wav;
    }
  }
  return nullptr;
}


void playStage(const char* stageName) {
  const StageWavData* wav = getStageWav(stageName);
  if (!wav) {
    static const StageWavData unknown = {unknown_wav, unknown_wav_len};
    wav = &unknown;
  }
  M5.Speaker.playWav(wav->data, wav->len);
  while (M5.Speaker.isPlaying()) {
    delay(10);
  }
}
