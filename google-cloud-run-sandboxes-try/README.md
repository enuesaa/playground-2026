# Cloud Run Sandboxes

- Cloud Run の新機能
- sandbox っていうバイナリを通してコマンドを実行するとホストコンテナの情報を取得できないっぽい
  - `/usr/local/gcp/bin/sandbox`
- 今のところコンソールからはサンドボックスモード？を有効化できないので cli で送った
    ```bash
    gcloud beta run deploy <value> \
    --image=<value> \
    --region=<value> \
    --service-account=<value> \
    --port=8080 \
    --cpu=1 \
    --memory=512Mi \
    --concurrency=80 \
    --timeout=300 \
    --execution-environment=gen2 \
    --sandbox-launcher 
    ```
- 初めてみたとき lambda microvms みたいなもんかと思ったけど全然違う

## Links
- https://dev.classmethod.jp/articles/cloud-run-sandboxes-preview/
