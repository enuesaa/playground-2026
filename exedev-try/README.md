# exe.dev

- Hacker News に上がっていたやつ
- Linux の一時環境を作れる
  - OS は Ubuntu 24.04
  - 主にウェブアプリ開発用
- VM を立ち上げるとドメイン/証明書/AIがついてくる
- AI に指示したらコードを書いてコマンドを実行してサーバー立ち上げて、最後にスクショを撮ってくれた。
  - Enterを押したらすぐに単語が送信されちゃうのでそれだけ注意
  - スクショ撮るのだけどうやっているのかわからないが、たぶんmcp的な感じにしているのだろう。
- `/home/exedev` にgitをおくと管理画面から git の diff を閲覧できる
  - 現状 diff だけで、ちょっとコメントをつけられる程度
  - 中途半端みを感じる。機能強化されるんだろうなあ。
- 今はalpha版なので、無料
  - そのうち有料になるっぽい
  - https://exe.dev/docs/pricing
  - どうなんだろう。AIがついてくるのであれば体験もいいし全体としては安いかもと思った。
- ちなみに `ssh exe.dev` で CLI が立ち上がる。ざんしん
  ```bash
  ➜ ssh exe.dev

  exe.dev ▶ docs
  exe.dev repl: command not found: "docs"
  exe.dev ▶ help

  EXE.DEV commands:

    help                 - Show help information
    doc                  - Browse documentation
    ls                   - List your VMs
    new                  - Create a new VM
    rm                   - Delete a VM
    share                - Share HTTPS VM access with others
      share show           Show current shares for a VM
      share port           Set the HTTP proxy port for a VM
      share set-public     Make the HTTP proxy publicly accessible
      share set-private    Restrict the HTTP proxy to authenticated users
      share add            Share VM with a user via email
      share remove         Revoke a user's access to a VM
      share add-link       Create a shareable link for a VM
      share remove-link    Revoke a shareable link
    whoami               - Show your user information including email and all SSH keys.
    delete-ssh-key       - Delete an SSH key
    shelley              - Manage Shelley agent on VMs
      shelley install      Install or upgrade Shelley to the current version
    ssh                  - SSH into a VM
    browser              - Generate a magic link to log in to the website
    exit                 - Exit

  Run help <command> for more details

  exe.dev ▶ ls
  No VMs found. Create one with 'new'.
  ```

## Links
- https://exe.dev/

