#include "player.hpp"
#include "assets/amaart.hpp"
#include "assets/gonzui.hpp"
#include "assets/kinmedai.hpp"
#include "assets/mahimahi.hpp"
#include "assets/mategai.hpp"
#include "assets/nampla.hpp"
#include "assets/namerou.hpp"
#include "assets/kusaya.hpp"
#include "assets/takaashi.hpp"
#include "assets/track.hpp"
#include "assets/yunohana.hpp"
#include "assets/hiramegaoka.hpp"
#include "assets/mantamaria.hpp"
#include "assets/masaba.hpp"
#include "assets/kaiun.hpp"
#include "assets/chouzame.hpp"
#include "assets/world.hpp"
#include "assets/taraport.hpp"
#include "assets/yagara.hpp"
#include "assets/zatou.hpp"
#include "assets/unknown.hpp"
#include "assets/koukashita.hpp"

namespace player {
  struct AssetStage {
    const char *name;
    const uint8_t *data;
    size_t len;
  };

  AssetStage stages[] = {
      {"ユノハナ大渓谷", yunohana_wav, yunohana_wav_len},
      {"ゴンズイ地区", gonzui_wav, gonzui_wav_len},
      {"ヤガラ市場", yagara_wav, yagara_wav_len},
      {"マテガイ放水路", mategai_wav, mategai_wav_len},
      {"ナンプラー遺跡", nampla_wav, nampla_wav_len},
      {"ナメロウ金属", namerou_wav, namerou_wav_len},
      {"クサヤ温泉", kusaya_wav, kusaya_wav_len},
      {"タラポートショッピングパーク", taraport_wav, taraport_wav_len},
      {"ヒラメが丘団地", hiramegaoka_wav, hiramegaoka_wav_len},
      {"マサバ海峡大橋", masaba_wav, masaba_wav_len},
      {"キンメダイ美術館", kinmedai_wav, kinmedai_wav_len},
      {"マヒマヒリゾート＆スパ", mahimahi_wav, mahimahi_wav_len},
      {"海女美術大学", amaart_wav, amaart_wav_len},
      {"チョウザメ造船", chouzame_wav, chouzame_wav_len},
      {"ザトウマーケット", zatou_wav, zatou_wav_len},
      {"スメーシーワールド", world_wav, world_wav_len},
      {"コンブトラック", track_wav, track_wav_len},
      {"マンタマリア号", mantamaria_wav, mantamaria_wav_len},
      {"タカアシ経済特区", takaashi_wav, takaashi_wav_len},
      {"オヒョウ海運", kaiun_wav, kaiun_wav_len},
      {"デカライン高架下", koukashita_wav, koukashita_wav_len},
  };

  const AssetStage *getStageWav(const char *stageName) {
    for (int i = 0; i < sizeof(stages) / sizeof(stages[0]); i++) {
      if (strcmp(stages[i].name, stageName) == 0) {
        return &stages[i];
      }
    }
    return nullptr;
  }

  void playStage(const char *stageName) {
    const AssetStage *wav = getStageWav(stageName);
    if (wav) {
      play(wav->data, wav->len);
      return;
    }
    play(unknown_wav, unknown_wav_len);
  }
};
