# Docker Sandboxes

- docker 社の開発する docker のサンドボックス
- 使い勝手良さそう
- 通信先を制限できる
  - デフォルトで全部許可するか、あるいは後から approve するか
- カレントディレクトリがマウントされるっぽい
  - のでファイル作ったら維持される
  - カレントディレクトリより上は見えないっぽい

Setup
```bash
brew install docker/tap/sbx
sbx login
```

立ち上げ
```bash
$ sbx run shell

✓ agent@shell-tmp:~/tmp$ curl https://example.com
Approval required for example.com:443.
Review and respond with:
  sbx policy approval ls

✗ 127 agent@shell-tmp:~/tmp$ curl https://example.com
<!doctype html><html lang...

✓ agent@shell-tmp:/Users/nsrciog/tmp$ touch a.txt
✓ agent@shell-tmp:/Users/nsrciog/tmp$ exit

$ ls
a.txt
```

通信の許可
```bash
sbx policy approval ls
sbx policy approval respond network:<id> --option allow
```

## Links
- https://www.docker.com/ja-jp/products/docker-sandboxes/
- https://docs.docker.com/ai/sandboxes/get-started/
