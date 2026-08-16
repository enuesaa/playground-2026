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

### App Service
- Windows .NET 10 にて作成
  - <img src="./docs/appservicecreate.png" width="300px" />
- 作ったらこんな感じ
  - <img src="./docs/appservice.png" width="300px" />
- Front Door からのみアクセスできるよう設定する。ちなみにここでIPアドレスをホワイトリストに入れることも可能
  - <img src="./docs/appserviceaccess.png" width="300px" />
- よくわからんがデバッグコンソール的なものもついてくる
  - <img src="./docs/appserviceconsole.png" width="300px" />

### Front Door
- フロントドアプロファイルを作成
- 作ったらこんな感じ
  - <img src="./docs/frontdooroverview.png" width="300px" />
- Blob Storage の静的ウェブホスティングをオリジンに指定（デフォルト）
  - <img src="./docs/frontdoorstorageorigin.png" width="300px" />
- App Service のオリジンを作成
  - <img src="./docs/frontdoorapi.png" width="300px" />
  - <img src="./docs/frontdoorapiorigin.png" width="300px" />
- そしてフロントドアマネージャーにてルート設定 (/api/*)
  - <img src="./docs/frontdoormanager.png" width="300px" />

### Azure DevOps
- プロジェクトを作成
- GitHub Repository と繋ぐ
- 作ったらこんな感じ
  - <img src="./docs/devops.png" width="300px" />
- ビルドスクリプトはこんな感じ。yamlで
  - <img src="./docs/devopsyaml.png" width="300px" />
- デプロイに成功するとこんなログ
  - <img src="./docs/devopslog.png" width="300px" />
- 環境変数は Library の Variable Group で管理するのが良さそう
- Azure へは Resource Manager の workload identity federation にて接続するっぽい

### EntraID
- SPA ように client を作成（アプリケーションの登録）
- App Service でも client を作成。EasyAuth と呼ぶらしい
  - 「許可されたクライアント アプリケーション」に SPA の client id を入れる
  - <img src="./docs/entraappservice.png" width="300px" />
  - で、EntraIDでAPIの公開設定へ。
  - <img src="./docs/entraappserviceapiallow.png" width="300px" />
- するとログインできるようになった
  - <img src="./docs/uilogin.png" width="300px" />
  - <img src="./docs/ui.png" width="300px" />
- まじで使う時はちゃんと確認した方がいい
