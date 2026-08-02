# Apache Kafka

- メッセージキュー
- GUIはないらしい。OSSのやつがあるのでサイドカーとして入れている
- 意外にもSQSに似ているなあと思った。
  - producer/consumerの構造だからね
- 処理に成功した時メッセージは消さないらしい
- Java で書かれている

コマンド
```bash
### Create a topic
➜ docker compose exec  -it kafka /opt/kafka/bin/kafka-topics.sh \
  --create --topic test-topic --bootstrap-server localhost:9092
Created topic test-topic.

### メッセージ送信
### 1行1メッセージっぽい。ctrl c で閉じる
➜ docker compose exec -it kafka /opt/kafka/bin/kafka-console-producer.sh \
  --topic test-topic --bootstrap-server localhost:9092
>testst

### メッセージ受信
➜ docker compose exec -it kafka /opt/kafka/bin/kafka-console-consumer.sh \
  --topic test-topic --bootstrap-server localhost:9092 --from-beginning
testst
```

## Links
- https://github.com/apache/kafka