# mago

- PHP の静的解析ツール
- install
  - ホストマシンに入れることもできるっぽい。homebrew で入れたり curl でダウンロードしたり。
  - composer 経由でもインストールできる
  - 最初に mago init を実行して初期セットアップ。これは mago.toml を作るっぽい
- fmt
  - フォーマッタ
  - ありがたい
  - https://mago.carthage.software/1.30.0/en/tools/formatter/overview/
    - prettier とか rustfmt を参考に作ってるらしい
    - fmt の解説とか初めて見たかも
  - デフォルトは PER Coding Style 3.0 らしい
    - PSR 12 ベース
    - というかこんなのできてたんだ
- lint はルールベースな印象
  - phpstan でも見たことあるやつが多い
  - フレームワーク専用のルールもあるっぽい
  - https://mago.carthage.software/1.30.0/en/tools/linter/rules/#integration-specific-rules
- analyze は静的解析にあたるが
  - これはだいぶしっかりしてそう。厳密
  - __call とかと相性が悪いんじゃないかな
  - mixed type とか基底クラスのphpdocとの不整合とかはなるほどなーこういうのを検出したいなあと思った。
  - 一方で Laravel Eloquent が暗黙的に用意しているメソッドとかフレームワークに近い部分はどうすればいいのだろうと思った。無視するとか判断が必要？
- rust で書かれている

## Commands

install
```bash
/var/www/html# ./vendor/bin/mago init
Downloading mago 1.30.0 for aarch64-unknown-linux-gnu...
  8.6 / 8.6 MB (100%)
Downloaded.

 Mago

 ⬩ Welcome! Let's get you set up.

  ╭─ Step 1: Project Setup
```

fmt
```bash
/var/www/html# ./vendor/bin/mago fmt --dry-run
diff of 'app/Http/Controllers/Controller.php':
--- original
+++ modified
@@ -1,4 +1,5 @@
 <?php
+
 namespace App\Http\Controllers;

 abstract class Controller

 INFO Found 1 file(s) that need formatting.

/var/www/html# ./vendor/bin/mago fmt
 INFO Formatted 1 file(s) successfully.
```

lint
```bash
/var/www/html# ./vendor/bin/mago lint
note[no-empty-comment]: Empty comments are not allowed.
   ┌─ app/Providers/AppServiceProvider.php:14:9
   │
14 │         //
   │         ^^ This is an empty comment
   │
   = Help: Consider removing this comment.

note[no-empty-comment]: Empty comments are not allowed.
   ┌─ app/Providers/AppServiceProvider.php:22:9
   │
22 │         //
   │         ^^ This is an empty comment
   │
   = Help: Consider removing this comment.

warning[strict-types]: Missing `declare(strict_types=1);` statement at the beginning of the file.
  ┌─ app/Providers/AppServiceProvider.php:1:1
  │
1 │ <?php
  │ ^^^^^
  │
  = The `strict_types` directive enforces strict type checking, which can prevent subtle bugs.
  = Help: Add `declare(strict_types=1);` at the top of your file.

warning[strict-types]: Missing `declare(strict_types=1);` statement at the beginning of the file.
  ┌─ tests/Unit/ExampleTest.php:1:1
  │
1 │ <?php
  │ ^^^^^
  │
  = The `strict_types` directive enforces strict type checking, which can prevent subtle bugs.
  = Help: Add `declare(strict_types=1);` at the top of your file.

warning[strict-types]: Missing `declare(strict_types=1);` statement at the beginning of the file.
  ┌─ tests/Pest.php:1:1
  │
1 │ <?php
  │ ^^^^^
  │
  = The `strict_types` directive enforces strict type checking, which can prevent subtle bugs.
  = Help: Add `declare(strict_types=1);` at the top of your file.

help[prefer-arrow-function]: This closure can be simplified to a more concise arrow function.
   ┌─ tests/Pest.php:29:29
   │
29 │ expect()->extend('toBeOne', function () {
   │                             ^^^^^^^^ This traditional closure...
30 │     return $this->toBe(1);
   │            -------------- ...can be converted to an arrow function that implicitly returns this expression.
   │
   = Arrow functions provide a more concise syntax for simple closures that do nothing but return an expression.
   = Arrow functions automatically capture variables from the parent scope by-value, which differs from traditional closures that use an explicit `use` clause and can capture by-reference.
   = Help: Consider rewriting this as an arrow function to improve readability.

warning[strict-types]: Missing `declare(strict_types=1);` statement at the beginning of the file.
  ┌─ app/Models/Memo.php:1:1
  │
1 │ <?php
  │ ^^^^^
  │
  = The `strict_types` directive enforces strict type checking, which can prevent subtle bugs.
  = Help: Add `declare(strict_types=1);` at the top of your file.

```

analyze
```bash
/var/www/html# ./vendor/bin/mago analyze
error[non-existent-function]: Function `test` could not be found.
  ┌─ tests/Unit/ExampleTest.php:3:1
  │
3 │ test('that true is true', function () {
  │ ^^^^ Undefined function `test` called here
  │
  = This often means the function/method is misspelled, not imported correctly (e.g., missing `use` statement for namespaced functions), or not defined/autoloaded.
  = Help: Check for typos in `test`. Verify namespace imports if applicable, and ensure the function is defined and accessible.

error[incompatible-property-type]: Property `App\Models\Memo::$fillable` has an incompatible type declaration from docblock.
   ┌─ app/Models/Memo.php:10:13
   │
10 │      * @var list<string>
   │             ^^^^^^^^^^^^ This type `list<string>` is incompatible with the parent's type.
   │
   ┌─ vendor/laravel/framework/src/Illuminate/Database/Eloquent/Concerns/GuardsAttributes.php:10:13
   │
10 │      * @var array<int, string>
   │             ------------------ The parent property is defined with type `array<int, string>` here.
   │
   = PHP requires property types to be invariant, meaning the type declaration in a child class must be exactly the same as in the parent class.
   = Help: Change the type of `$fillable` to `array<int, string>` to match the parent property.

warning[non-documented-method]: Ambiguous method call to `create` on class `App\Models\Memo`.
   ┌─ app/Http/Livewire/Memos/Create.php:42:15
   │
42 │         Memo::create([
   │         ----  ^^^^^^ This method is not explicitly defined
   │         │
   │         On an object of type `App\Models\Memo`
   │
   = While this call might be handled by `__call()` or `__callStatic()`, Mago cannot verify its arguments or return type without a corresponding `@method` docblock tag.
   = Help: To enable full analysis, add a `@method` tag to the docblock of the `App\Models\Memo` class. For example: `/** @method returnType create(argType $argName) */`

warning[non-documented-method]: Ambiguous method call to `emitup` on class `App\Http\Livewire\Memos\Create`.
   ┌─ app/Http/Livewire/Memos/Create.php:48:16
   │
48 │         $this->emitUp('memoCreated');
   │         -----  ^^^^^^ This method is not explicitly defined
   │         │
   │         On an object of type `App\Http\Livewire\Memos\Create`
   │
   = While this call might be handled by `__call()` or `__callStatic()`, Mago cannot verify its arguments or return type without a corresponding `@method` docblock tag.
   = Help: To enable full analysis, add a `@method` tag to the docblock of the `App\Http\Livewire\Memos\Create` class. For example: `/** @method returnType emitup(argType $argName) */`

error: found 18 issues: 15 error(s), 3 warning(s)
```

ast も見れるっぽい。知識なくてこれがastなのかわからんが
```bash
/var/www/html# ./vendor/bin/mago ast app/Http/Controllers/Controller.php

Program
├── Statement
│   └── OpeningTag
│       └── FullOpeningTag
└── Statement
    └── Namespace
        ├── Keyword
        ├── Identifier
        │   └── QualifiedIdentifier App\Http\Controllers
        └── NamespaceBody
            └── NamespaceImplicitBody
                ├── Terminator ;
                └── Statement
                    └── Class
                        ├── Modifier
                        │   └── Keyword
                        ├── Keyword
                        └── LocalIdentifier Controller
```

## Links
- https://github.com/carthage-software/mago
- https://zenn.dev/sonicmoov/articles/466c13fcfd2384
