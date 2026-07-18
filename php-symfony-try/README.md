# symfony

- いまさらながら。
- チュートリアルが「traditional app」と「microservice」に分かれてる。ウェブアプリは traditional らしい
  - https://symfony.com/doc/current/setup.html#creating-symfony-applications
- 知ってたけど Attribute で routing できるのやっぱいいな
  - `php bin/console debug:router` でルーティングを一覧表示できる
  - https://symfony.com/doc/current/page_creation.html

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
