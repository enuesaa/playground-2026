# Laravel Scout

- 検索のライブラリ
- 検索エンジンとして algolia や meilisearch や database (postgres/mysqlの関数を使う感じ) もしくは collection (phpの関数で文字列一致？に見える) を指定できる
- model にtraitを被せると search ていうメソッドが追加されるので、それを呼び出す感じ。
- indexを作っているのではなく、検索するときにそういう関数を呼び出しているっぽい
```php
array:1 [▼ // routes/api.php:11
  0 => array:3 [▼
    "query" => "select * from "memos" where ((to_tsvector('english', "memos"."content")) @@ plainto_tsquery('english', ?)) order by ts_rank(to_tsvector('english', memos.content ▶"
    "bindings" => array:2 [▼
      0 => "help"
      1 => "help"
    ]
    "time" => 5.05
  ]
]
```

## Links
- https://laravel.com/docs/13.x/scout
