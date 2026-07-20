<?php

use App\Models\Memo;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

Route::get('/search', function (Request $request) {
    DB::enableQueryLog();    
    $list = Memo::search($request->search)->get();
    dump(DB::getQueryLog());
    return $list;
});

Route::post('/setup', function (Request $request) {
    $memos = [
        ['title' => 'hello1',              'content' => 'hello hello'],
        ['title' => 'hello world',         'content' => 'あいさつ1'],
        ['title' => 'hello there',         'content' => 'あいさつ2'],
        ['title' => 'help me understand',  'content' => 'help と hello は前方一致だと紛らわしいので混ぜてみる。'],
        ['title' => 'laravel tips',        'content' => 'Laravel Scoutの設定に関するメモ。'],
        ['title' => 'laravel scout setup', 'content' => 'SearchUsingPrefixとSearchUsingFullTextを組み合わせて使う。'],
        ['title' => 'coffee notes',        'content' => 'I love drinking coffee in the morning before work.'],
        ['title' => 'tea notes',           'content' => 'Drinking tea helps me relax in the evening.'],
        ['title' => 'random thoughts',     'content' => 'The quick brown fox jumps over the lazy dog.'],
        ['title' => 'meeting memo',        'content' => 'We discussed the search implementation and full text indexing strategy.'],
        ['title' => 'japanese sample',     'content' => '日本語の全文検索がどう動くかも確認したい。形態素解析の挙動が気になる。'],
    ];
    foreach ($memos as $memo) {
        Memo::create($memo);
    }
    return response()->json([
        'count' => Memo::count(),
    ]);
});
