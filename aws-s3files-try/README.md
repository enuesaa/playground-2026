# AWS S3Files

- S3 バケットをマウントできる
- EFS の上に S3 Bucket がのってるらしい
  - のでEFSの時と同じようなラグというか重さはある
  - S3 のパスしてもできるっぽい
- 作成方法
  - コンソールから
  - VPC を指定する。それだけ
  - すると各AZにマウントターゲットができる
    - まあ実体はENIだけど。
    - デフォルトではデフォルトセキュリティグループがアタッチされる様子
    - 当然だがデフォルトセキュリティグループでは運用上問題あるので変えたほうがいい
  - ちなみにリソースポリシー的なのもあるのでクロスアカウントいけると思う
- 挙動
  - S3 へアップロードしたらEC2(マウント先)へ即座に反映される
  - EC2(マウント先) にアップロードしたらおおよそ60秒以内に反映される
- EC2 へマウント
  - S3Filesの管理画面にマウント方法（コマンド）が表示されるのでそれを参考に。
  - LambdaやECSにもアタッチできる様子
- 請求は S3 のところに出るっぽい。それらしきものは下記。
  - `USD 0.04 per GB for APN1-Files-Read in Asia Pacific (Tokyo)`
  - `$0.36 per GB-Mo of Storage in Files`
  - `USD 0.07 per GB for APN1-Files-Write in Asia Pacific (Tokyo)`

```bash
curl https://amazon-efs-utils.aws.com/efs-utils-installer.sh | sudo sh -s -- --install
sudo mkdir /mnt/s3files
sudo mount -t s3files fs-xxx /mnt/s3files
ls /mnt/s3files
```

- s3files と file gateway や datasync との最大の違いは s3files は vpc 内に限定されるところかな。
  - 結局 ENI を作ること前提のサービス設計なので、あんま競合しないかも。
  - EC2 に datasync agent を入れて s3 へ転送するパターンがあるが、あれは置き換えできるかな
  - いずれにしても windows 環境は無理だという認識
- コストについてはわからん。
  - 情報が少ない
  - 今のところ大きな固定費がない認識
  - なので普通に EFS 使ってマウントするよりは安い？気がする
  - ファイル読み込み料金や書き込み料金はあるので、その従量課金かな
    - https://dev.classmethod.jp/articles/amazon-s3-files-pricing-visual-guide/
- というかこれまでEFSを使ってたところは全部これに置き換えできるかも
  - こっちの方が便利なので
  - CMSのファイルアップロードもこれになるのでは

## Links
- https://aws.amazon.com/jp/blogs/news/launching-s3-files-making-s3-buckets-accessible-as-file-systems/
- https://qiita.com/yama3133/items/61d8ae75d65f8ef873d9
- https://zenn.dev/genda_jp/articles/b6ff5ea33c7a71
