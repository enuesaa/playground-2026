# s3files with lambda

やりたいこと
```
s3 に laravel アプリのソースコードを置いて
それを s3files で lambda の /mnt/aaa にマウントして、
で、lambda に brew の lambda layer をつけて
lambda の handler を /mnt/aaa/public/index.php に向ける
```

### 設定
環境変数
- BREF_AUTOLOAD_PATH: /mnt/aaa/vendor/autoload.php
- BREF_RUNTIME: function

ハンドラー
Bref\LaravelBridge\Http\HttpHandler

### 結果
動いた。Lambdaの実行に10秒くらいかかる。

```json
// lambdaへのリクエスト
{
  "httpMethod": "GET",
  "path": "/hello",
  "headers": {},
  "queryStringParameters": null,
  "body": null,
  "isBase64Encoded": false
}
```

### 備考
vendor 配下のファイル数が多すぎで、AWSコンソールでS3にアップロードするのに30分くらいかかった。あと laravel アプリを実行するとき vendor 配下のファイルをけっこう見るので、ファイルの転送数が多くなり S3Files には合わないかなあと思った。マウントするのを public だけに限ったり工夫しないと厳しそう。
