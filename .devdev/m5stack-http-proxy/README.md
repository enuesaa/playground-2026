# HTTP Proxy

LLM Module から Core S3 へシリアル通信をする。CoreS3でWifiに接続する

```bash
systemctl stop llm-sys
stty -F /dev/ttyS1 921600 raw -echo -echoe -echok
echo "https://example.com/" > /dev/ttyS1
cat /dev/ttyS1
```
