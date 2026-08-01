# AWS Entity Resolutions

- 2つの似たようなデータセットがあるときに、そのデータを紐付けるサービス
- 入力は Glue Database (2つ)
- どちらかというと Glue の関連サービス
  - 逆になんで Glue って名前がつかないのか不思議なくらい
- サービス名称の Entity Resolutions ってのがまさにサービスの実体を示している
- 試してみた
  - 前提として Glue Database が2つ必要
    - なので S3 に products.csv を置いてそれを Glue Crawler でみて Glue Database を作って
    - 同じように S3 に productsja.csv を置いて同じようにして Glue Database を作った
  - その次に Entity Resolutions のコンソールを開く
  - スキーママッピングを作成
    - Glue Database を選択。マッチング対象のフィールドを選ぶ
  - ワークフローの作成
    - 入力となる Glue Database を選択。そのスキーマを選ぶ。
    - でマッチングのルールを選択。ルールベースで組み立てるか機械学習にするかなど
