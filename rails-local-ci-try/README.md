# Rails Local CI

- config/ci.rb にステップをかく
- すると `bin/ci` で実行できる様子
- ぱっと見は良さそう
- testcontainers や Dagger と思想が近い気がする。けどコンテナを立ち上げたりしないという点では別物か
- GitHub Actions からも bin/ci を呼び出せそう

comamnds
```bash
docker compose run --rm app bundle install
docker compose run --rm app bin/ci
```

## Links
- https://railsguides.jp/8_1_release_notes.html#%E3%83%AD%E3%83%BC%E3%82%AB%E3%83%ABci
