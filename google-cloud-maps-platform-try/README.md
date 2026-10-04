# Google Cloud Maps Platform

- Google Cloud では Google Maps Platform という名前
- コンソールを開くと、なんか自動で必要なAPIが有効化されるっぽい
  - たぶん他のサービス同様に API の有効化は必要と思われる
- 料金プランは、サブスクと従量課金の2種類があるっぽい
  - デフォルトでは従量課金っぽい
  - 高いとよく聞くけども
- よくわからんが Google Maps Platform 専用のサポート窓口があるっぽい
  - https://developers.google.com/maps/support?hl=ja#contact-maps-support
  - 地図領域においてはAWSよりもGoogle Cloudの方がサポートが手厚そうに思える

例えば経路検索をしてみる
```bash
➜ uv run main.py
{'routes': [{'legs': [{'steps': [{'distanceMeters': 2, 'staticDuration': '2s', 'navigationInstruction': {'maneuver': 'DEPART', 'instructions': '西に進む'}}, {'distanceMeters': 1, 'staticDuration': '1s', 'navigationInstruction': {'maneuver': 'TURN_LEFT', 'instructions': '左折する'}}, {'distanceMeters': 72, 'staticDuration': '80s', 'navigationInstruction': {'maneuver': 'TURN_RIGHT', 'instructions': '右折する'}}, {'distanceMeters': 51, 'staticDuration': '46s', 'navigationInstruction': {'maneuver': 'TURN_RIGHT', 'instructions': '右折する'}}, {'distanceMeters': 81, 'staticDuration': '59s', 'navigationInstruction': {'maneuver': 'TURN_LEFT', 'instructions': '左折する'}}, {'distanceMeters': 15, 'staticDuration': '11s', 'navigationInstruction': {'maneuver': 'TURN_RIGHT', 'instructions': '右折する'}}, {'distanceMeters': 180, 'staticDuration': '158s'}, {'distanceMeters': 221, 'staticDuration': '192s'}, {'distanceMeters': 8, 'staticDuration': '6s', 'navigationInstruction': {'maneuver': 'TURN_RIGHT', 'instructions': '右折して メッセ大通り に向かう'}}, {'distanceMeters': 146, 'staticDuration': '120s', 'navigationInstruction': {'maneuver': 'TURN_LEFT', 'instructions': '左折してメッセ大通りに入る\n目的地は前方左側です'}}]}], 'distanceMeters': 777, 'duration': '674s', 'polyline': {'encodedPolyline': 'wqqxEqyvuYAAPLtAxA}@rAXd@XZRBf@f@SRpD|DHGn@v@AJMBe@t@CDBN`@b@CLY^GDgBtCU^GEqDvF'}, 'localizedValues': {'distance': {'text': '0.8 km'}, 'duration': {'text': '11分'}, 'staticDuration': {'text': '11分'}}}]}
distanceMeters 777
duration 674s
```

## Links
- https://g-gen.co.jp/useful/google-service/26307/
- https://cloud-ace.jp/column/detail336/
