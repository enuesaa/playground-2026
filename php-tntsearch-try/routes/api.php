<?php

use Illuminate\Http\Request;
use TeamTNT\TNTSearch\TNTSearch;
use Illuminate\Support\Facades\Route;

function makeTnt(): TNTSearch
{
    $tnt = new TNTSearch;
    $tnt->loadConfig([
        'driver'   => 'sqlite',
        'database' => '/var/www/html/data.sqlite',
        'storage'  => '/var/www/html/storage/indexes/',
    ]);
    return $tnt;
}

Route::get('/search', function (Request $request) {
    $tnt = makeTnt();
    $tnt->selectIndex('test.index');

    $results = $tnt->search($request->search ?? '', 10);

    return $results;
});

Route::post('/setup', function (Request $request) {
    // 1. data.sqlite に memos テーブルを作ってテストデータを入れる
    $pdo = new \PDO('sqlite:/var/www/html/data.sqlite');
    $pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

    $pdo->exec('DROP TABLE IF EXISTS memos');
    $pdo->exec('
        CREATE TABLE memos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            content TEXT
        )
    ');

    $memos = [
        ['hello world',        '朝の挨拶についてのメモ。'],
        ['hello there',        '別の挨拶パターン。'],
        ['help me understand', 'help と hello は前方一致だと紛らわしいので混ぜてみる。'],
        ['laravel tips',       'Laravel Scoutの設定に関するメモ。'],
        ['laravel scout setup','SearchUsingPrefixとSearchUsingFullTextを組み合わせて使う。'],
        ['coffee notes',       'I love drinking coffee in the morning before work.'],
        ['tea notes',          'Drinking tea helps me relax in the evening.'],
        ['random thoughts',    'The quick brown fox jumps over the lazy dog.'],
        ['meeting memo',       'We discussed the search implementation and full text indexing strategy.'],
        ['japanese sample',    '日本語の全文検索がどう動くかも確認したい。形態素解析の挙動が気になる。'],
        ['hello1',             'hello hello'],
    ];

    $stmt = $pdo->prepare('INSERT INTO memos (title, content) VALUES (?, ?)');
    foreach ($memos as [$title, $content]) {
        $stmt->execute([$title, $content]);
    }

    // 2. TNTSearchでインデックスを作成
    $tnt = makeTnt();
    $tnt->setDatabaseHandle($pdo);

    $indexer = $tnt->createIndex('test.index');
    $indexer->setPrimaryKey('id');
    $indexer->query('SELECT id, title, content FROM memos;');
    $indexer->run();

    return response()->json([
        'count' => $pdo->query('SELECT COUNT(*) FROM memos')->fetchColumn(),
    ]);
});
