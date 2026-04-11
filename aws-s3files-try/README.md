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
- EC2 へマウント
  - S3Filesの管理画面にマウント方法（コマンド）が表示されるのでそれを参考に。
  - LambdaやECSにもアタッチできる様子

```bash
curl https://amazon-efs-utils.aws.com/efs-utils-installer.sh | sudo sh -s -- --install
sudo mkdir /mnt/s3files
sudo mount -t s3files fs-xxx /mnt/s3files
ls /mnt/s3files
```

## Links
- https://aws.amazon.com/jp/blogs/news/launching-s3-files-making-s3-buckets-accessible-as-file-systems/
- https://qiita.com/yama3133/items/61d8ae75d65f8ef873d9
