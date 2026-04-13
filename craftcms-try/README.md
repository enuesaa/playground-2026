# CraftCMS

- PHP で書かれた CMS
- セルフホストできるがライセンスには注意
  - https://craftcms.com/docs/5.x/editions.html
  - 基本的に有償であると捉えた方がよさそう。
- ddev という craftcms が作っているコマンドでローカル開発環境をセットアップできる
  - https://craftcms.com/glossary/ddev
- yii2 ベースらしい
  - ぱっとみた感じ yii2 ベースで、それに symfony や laravel の utility package を入れているのかな？
  - https://github.com/craftcms/cms/blob/5.x/composer.json
  - https://tinybeans.net/blog/2019/12/colofulbox-craftcms-01.html
- 試した感じ商用CMSだわ。
  - よくできてる
  - 肌感は MovableType に似ている
  - 記事のテンプレートをまず用意して、
    - たとえばタイトルや記事の本文のフィールドをセットアップして、
    - エントリで記事データを入力する
    - 記事のテンプレート設定で templates/aaa/aaa.twig で render するよう設定できる

### ローカル開発環境のセットアップ
https://craftcms.com/docs/getting-started-tutorial/install/

```bash
brew install ddev/ddev/ddev
mkcert -install

# create docker env
mkdir app
cd app
ddev config --project-type=craftcms --docroot=web

# start app
ddev start  ## this starts docker containers, which contains traefik, mysql, nginx-fpm, xhgui

# describe urls
ddev describe

# create project
ddev composer create-project "craftcms/craft"

# launch
ddev launch
```

### Sample twig
https://craftcms.com/docs/getting-started-tutorial/build/blog-templates.html#data

```twig
<html>
<body>
    title: {{ entry.title }}!
    text: {{ entry.text }}!
</body>
</html>
```

### Links
- https://craftcms.com/
- https://github.com/craftcms/cms
