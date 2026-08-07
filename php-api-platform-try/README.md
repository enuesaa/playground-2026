# API Platform

- Symfony 系統のフレームワーク
- Laravel ベースでも作れるようになった？ぽい
- scalar という API Doc 的なものがついてきた。
- たぶんベースが別のフレームワークになっているからというのもあるが、思ったよりファイル数が少ない
- なんか Entity とかみると全然 symfony だな
- GraphQL もいけるっぽい
- ある意味で Symfony のエコシステムの一つとも言えるかもしれない

## Commands
```bash
$ composer global require api-platform/installer
$ /root/.composer/vendor/bin/api-platform bookshop-api --framework=symfony

API Platform installer
======================

 Use Docker? (yes/no) [yes]:
 > no

 ! [NOTE] Skipping PWA prompt: node, npx, pnpm not found in PATH.
 ! [NOTE] Skipping admin prompt: node, npm not found in PATH.

 API formats (comma-separated) [jsonld, jsonapi, hal]:
  [0] jsonld
  [1] jsonapi
  [2] hal
 > 1

 API documentation (comma-separated) [swagger_ui, redoc, scalar]:
  [0] swagger_ui
  [1] redoc
  [2] scalar
 > 2

Creating symfony project "bookshop-api"
```

## Links
- https://api-platform.com/docs/symfony/
