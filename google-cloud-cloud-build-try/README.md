# Cloud Build

- 改めてトライ
- AWS でいう CodeConnections と CodePipeline (トリガー機能) と CodeBuild に相当
- 「リポジトリ」は CodeConnections に相当
  - これは第一世代と第二世代がある
  - 接続を作成ボタンを押すと GitHub 連携等できる
  - 接続を作ったあとは各リポジトリをリンクする必要あり
    - リンクというか、接続先（GitHub）を選んでそこのリポジトリを選択するだけ
- 「トリガー」は CodePipeline のトリガー機能と CodeBuild に相当
  - pushイベントをトリガーに実行できる
  - Cloud Scheduler で定期実行可能。設定の際はサービスアカウントを指定する必要あり

cloudbuild.yaml
```bash
steps:
  - name: ubuntu
    args:
      - echo
      - hello world
  - name: ubuntu
    script: |
      #!/usr/bin/env bash

      echo aa
      pwd
      ls -la
      which node
      which npm
      which pnpm
```