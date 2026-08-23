# AWS IAM Role Manager

- IAM にロールマネージャーという機能ができた。
- これはたとえば Lambda 関数を作成するときに明示的に IAM Role を作成/選択する必要がない機能
- じゃあどうなるのか、と言うと、裏側で PowerUserRole という IAM Role が作成される
  - すでにあったらそれが選択される？っぽい
  - 権限としては PowerUserAccess がそのままアタッチされている
- まあ要は、ちょっと Lambda 関数を作りたい時に個別に IAM Role を作る必要はなくて、PowerUserRole というのを選べばいいよね、っていう感じと理解
- なんか正直やばいと思った
  - 結局権限の絞り込みは自分でやる必要がある
  - こんなん実際のところ使えない
  - 権限が多すぎる
- SCP で禁止する事例を見てはじめに疑問に思ってたけど、この仕組み的ではそうせざるを得ない

## Links
- https://dev.classmethod.jp/articles/iam-role-manager-lambda-execution-role/
- https://dev.classmethod.jp/articles/iam-role-manager-ga/
