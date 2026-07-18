# symfony

- いまさらながら。
- チュートリアルが「traditional app」と「microservice」に分かれてる。ウェブアプリは traditional らしい
  - https://symfony.com/doc/current/setup.html#creating-symfony-applications
- 知ってたけど Attribute で routing できるのやっぱいいな
  - `php bin/console debug:router` でルーティングを一覧表示できる
  - https://symfony.com/doc/current/page_creation.html
- ORM はデフォルトでは Doctrine ORM らしい
  - Doctrine ってあのアノテーションで有名なやつだ。その兄弟みたいな
    - https://www.doctrine-project.org/projects.html
    - apache project みたいな感じだと思う
  - v1 は active record pattern で v2 は datamapper pattern らしい
    - https://qiita.com/77web@github/items/7cbae4bea659f32e4b98
    - https://engineering.otobank.co.jp/entry/2021/05/17/151328

## Commands
```bash
composer create-project symfony/skeleton:"8.1.*" .
composer require webapp
```

entity の作成
```bash
# ここで Note だとか指定してフィールドを追加する。
# すると Entity と Repository ができる
php bin/console make:entity 

# Entity をみているっぽい。マイグレーションファイルができる
php bin/console make:migration

# マイグレーション
php bin/console doctrine:migrations:migrate
```
