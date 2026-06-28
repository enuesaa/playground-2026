# apple container

- 2025年にまず発表されて2026年にv1がリリースされた
- 去年も触ったけどいろいろ良くなったらしいのでリトライ
- インストール
  - https://github.com/apple/container/releases より。
  - 元々 container v0.3.0 がインストールされていた
  - github releases よりインストーラーをダウンロードして再インストールすればアップデートされた
    ```bash
    ➜ container --version
    container CLI version 1.0.0 (build: release, commit: ee848e3)
    ```
- ヘルプテキストを見る感じ、docker cli とほとんどかわらない
  - compose がないくらいかな
    ```bash
    ➜ container --help
    OVERVIEW: A container platform for macOS

    USAGE: container [--debug] <subcommand>

    OPTIONS:
    --debug                 Enable debug output [environment: CONTAINER_DEBUG]
    --version               Show the version.
    -h, --help              Show help information.

    CONTAINER SUBCOMMANDS:
    copy, cp                Copy files/folders between a container and the local filesystem
    create                  Create a new container
    delete, rm              Delete one or more containers
    exec                    Run a new command in a running container
    export                  Export a container's filesystem as a tar archive
    inspect                 Display information about one or more containers
    kill                    Kill or signal one or more running containers
    list, ls                List running containers
    logs                    Fetch container logs
    run                     Run a container
    start                   Start a container
    stats                   Display resource usage statistics for containers
    stop                    Stop one or more running containers
    prune                   Remove all stopped containers
    ```

## コマンド

起動
```bash
➜ container system start

Launching container-apiserver...
Testing access to container-apiserver...
Verifying machine API server is running...
```

イメージプル
```bash
➜ container image pull ubuntu:latest
⠹ [1/2] Fetching image 0% (13 of 43 blobs, 18 KB/260.4 MB, 4 KB/s) [5s]

➜ container image ls
NAME                                   TAG     DIGEST
debian                                 latest  d07d1b51c39f
ubuntu                                 latest  53958ec7b67c
ghcr.io/apple/containerization/vminit  0.5.0   9a07572f190f
```

コンテナ起動
```bash
➜ container run -it debian:latest bash
root@beb22ded-fde8-4730-854d-89d186b3e59a:/# pwd
/
root@beb22ded-fde8-4730-854d-89d186b3e59a:/# ls
bin  boot  dev	etc  home  lib	lost+found  media  mnt	opt  proc  root  run  sbin  srv  sys  tmp  usr	var
root@beb22ded-fde8-4730-854d-89d186b3e59a:/# cat /etc/os-release
PRETTY_NAME="Debian GNU/Linux 13 (trixie)"
NAME="Debian GNU/Linux"
VERSION_ID="13"

➜ container ls --all
ID                                    IMAGE                            OS     ARCH   STATE    IP  CPUS  MEMORY   STARTED
beb22ded-fde8-4730-854d-89d186b3e59a  docker.io/library/debian:latest  linux  arm64  stopped      4     1024 MB  2026-06-28T08:47:22Z

➜ container rm beb22ded-fde8-4730-854d-89d186b3e59a
beb22ded-fde8-4730-854d-89d186b3e59a
```

イメージのビルド
```bash
➜ container build -t aaa .
[+] Building 27.9s (7/7) FINISHED
 => [resolver] fetching image...docker.io/library/ubuntu:24.04                                                                                   0.0s
 => [internal] load build definition from Dockerfile

➜ container run -it --rm aaa:latest bash
root@f7b1a269-f7bd-4029-9ee6-ef769d63e938:/# which aws
/usr/local/bin/aws
root@f7b1a269-f7bd-4029-9ee6-ef769d63e938:/# aws --version
aws-cli/2.35.11 Python/3.14.5 Linux/6.12.28 exe/aarch64.ubuntu.24
```

## Links
- https://github.com/apple/container
- https://zenn.dev/tokium_dev/articles/202c16adec91d0
