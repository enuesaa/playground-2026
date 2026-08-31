# rails-bookshop-api

Swagger PetstoreのBookshop版、というノリのサンプルAPIです。Rails (API mode) + CouchDBで、`docker compose`だけで動きます。

- リソースは `books`（本のマスタデータ）と `bookshops`（書店）の2つ。書店ごとの在庫は `stocks` で表現しています。
- ActiveRecordは使っていません。永続化は素のCouchDB (`couchrest` gem) 経由です。
- 意図的にテストは実装していません（別担当が追加する前提です）。
- データはすべて架空のサンプルです。書名・著者名はダミー、メールアドレスは `@example.com`、住所はすべて「東京都千代田区1-1」に固定しています。電話番号のフィールドはそもそもありません。

## 起動

```sh
docker compose up --build
```

初回だけ、別ターミナルでモックデータを投入します（何度実行してもDBを作り直すだけなので安全です）。

```sh
docker compose exec api bin/rails db:seed
```

APIは `http://localhost:3000` で、CouchDBのHTTP APIは `http://localhost:5984`（Fauxton UIは `http://localhost:5984/_utils`、user: `admin` / password: `password`）で待ち受けます。

## エンドポイント

| Method | Path                      | 説明                               |
|--------|----------------------------|------------------------------------|
| GET    | /health                    | ヘルスチェック                     |
| GET    | /books                     | 本の一覧                           |
| POST   | /books                     | 本の登録                           |
| GET    | /books/:id                 | 本の詳細                           |
| PATCH  | /books/:id                 | 本の更新                           |
| DELETE | /books/:id                 | 本の削除                           |
| GET    | /books/:id/bookshops       | その本を扱っている書店一覧（在庫数付き） |
| GET    | /bookshops                 | 書店の一覧                         |
| POST   | /bookshops                 | 書店の登録                         |
| GET    | /bookshops/:id             | 書店の詳細                         |
| PATCH  | /bookshops/:id             | 書店の更新                         |
| DELETE | /bookshops/:id             | 書店の削除                         |
| GET    | /bookshops/:id/stocks      | その書店の在庫一覧                 |
| POST   | /bookshops/:id/stocks      | 在庫の追加                         |
| PATCH  | /bookshops/:id/stocks/:id  | 在庫数の更新                       |
| DELETE | /bookshops/:id/stocks/:id  | 在庫の削除                         |

## 動作確認例

```sh
curl http://localhost:3000/books
curl http://localhost:3000/bookshops
curl http://localhost:3000/books/<book_id>/bookshops
```
