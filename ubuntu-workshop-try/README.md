# Ubuntu Workshop

- これ。気になった。
  https://www.publickey1.jp/blog/26/ubuntuworkshop.html
- EC2で Ubuntu 26.04 を立ち上げて検証
- ストレージサイズは多めがいいかも。最低5GiB必要らしい

## Commands
Install
```sh
snap install --channel=6/stable lxd
snap install --classic workshop
```

workshopd が起動しているか確認
```bash
$ sdk find go
NAME     VERSION  PUBLISHER     SUMMARY
flutter  3.41.6   Dmitry Lyfar  Google's UI toolkit for multi-platform apps
go       1.26.3   Dmitry Lyfar  The Go programming language
```

workshop init
```bash
$ workshop init devdev --sdks go/1.26/stable
"devdev" workshop created at .workshop/devdev.yaml

$ cat .workshop/devdev.yaml
name: devdev
base: ubuntu@24.04
sdks:
  - name: go
    channel: 1.26/stable

$ workshop list
WORKSHOP  STATUS  NOTES
devdev    Off     -
```

セットアップはこれでOKのはずであとは起動だがなんか失敗する。なんだろうなあ。
```bash
$ workshop launch
error: cannot perform the following tasks:
- Start "devdev" workshop (Failed running: ... exit status 1)
"devdev" launch aborted

$ workshop launch --verbose
✓ Retrieve "go" SDK from channel "1.26/stable"
✓ Retrieve "system" SDK
✓ Download "ubuntu@24.04" base image
✓ Create "devdev" storage directories
✓ Create new "devdev" workshop
2026-06-11T06:45:33Z ERROR Failed running: ...
```

たぶんどうでもいいところで何かエラーが起きていて起動できてなさそう。仕組み的には興味深い。この辺りのトラブルシューティングをできなきゃ普段使いは難しそう。まだ。


## Links
- https://ubuntu.com/workshop
