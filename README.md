# azure-devops-try

### SQL Database

- SQLデータベース(無料プラン) というボタンから作成
- 先にデータベースサーバーを作成する必要あり
  - 認証方法は「SQL 認証」へ。
  - 要はユーザー名/パスワードでの認証ということ。
- できたらこんな感じ
  - <img src="./docs/sqlserver.png" width="300px" />
- ファイアウォールの設定は注意
  - あんま詳しく見れてない
  - デフォルトの設定が緩めに見えているので実運用ではちゃんと確認した方がいい
- 接続文字列というページにいわゆる DBURI 的なものが書かれている
  - これをApp Serviceの環境変数の接続文字列（AzureSQL）へセットする
  - <img src="./docs/sqlserverconn.png" width="300px" />
- クエリエディタよりSQLを実行できる
  - <img src="./docs/sqlserverquery.png" width="300px" />
  - <img src="./docs/sqlservertable.png" width="300px" />

テーブル作成
```sql
CREATE TABLE notes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(200) NOT NULL,
    content NVARCHAR(MAX) NULL,
    created_at DATETIME2 DEFAULT SYSUTCDATETIME()
);

INSERT INTO notes (title, content) VALUES
(N'テスト', 'this is test'),
('test', 'test'),
('aaa', 'aaa'),
('bbb', 'test');

DELETE FROM notes;
```

### Blob Storage

- ストレージアカウントを作成
- 作ったらこんな感じ
  - <img src="./docs/storageaccount.png" width="300px" />
- 静的ウェブホスティングの設定
  - <img src="./docs/storagestaticweb.png" width="300px" />
- で $web というところにアップロードする
  - <img src="./docs/storageweb.png" width="300px" />
  - <img src="./docs/storagecontainerweb.png" width="300px" />
- するとみれる
