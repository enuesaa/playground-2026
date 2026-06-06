# Temporal

- retry
  https://github.com/enuesaa/playground-2025/tree/main/temporal-go-try
- やっぱよくできてる
  - 理解したらよくできてるってわかる
  - けど理解まで時間かかるかも
- あと実務で運用するのはちょっと怖いかもと思ってしまった
  - GUI でなんでもできてしまう
  - GUI を触るの禁止とかしないとちょっとだいぶ怖い
- スケジューリングして、起動時間に worker が立ってなかったら
  - workflow は実行される。というかトリガーされて workflows のところにも出てくる
  - が worker がなくて実行できてない旨が書かれる
  - そのあと worker が立ち上がってきたら、その workflow が通常実行される
    - おそらく通常より遅れるって感じだと思う
    - 時刻にクリティカルなシステムは要注意

## Command
```bash
### Install
brew install temporal

### Run Temporal Server
temporal server start-dev --db-filename temporal.db --ui-port 8080

### Run Worker
go run .

### Run Workflow
go run ./start-workflow

### Create Schedule
go run ./create-schedule
```

## Links
- https://temporal.io/
