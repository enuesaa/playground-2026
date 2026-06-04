# gobee

- Go
- eBPF を使うコードをかけるらしい
  - 正確じゃないかも
  - BPF って書いてある。あんま違い分かってない
- 面白い
- macos でもできないことないらしいけど、ローカル汚れるだろうし、たぶん linux の方がいいと思う
  - ./examples/helloworld のチュートリアルがちょうどいい。
  - これはパケットの数を数えるっぽい

```bash
### build
$ dnf install golang
$ git clone https://github.com/boratanrikulu/gobee
$ cd gobee/
$ cd example/helloworld/
$ make build
$ dnf install clang
$ dnf install -y libbpf libbpf-devel
$ make build # creates ./helloworld binary

### run
$ ./helloworld eth0
2026/06/04 12:23:19 attached XDP to eth0, ctrl-c to detach
2026/06/04 12:23:20 packets on eth0: 0 (no entry yet)
2026/06/04 12:23:21 packets on eth0: 0 (no entry yet)
2026/06/04 12:23:22 packets on eth0: 16
2026/06/04 12:23:23 packets on eth0: 16
2026/06/04 12:23:24 packets on eth0: 16
2026/06/04 12:23:25 packets on eth0: 16
2026/06/04 12:23:26 packets on eth0: 16
2026/06/04 12:23:27 packets on eth0: 17
2026/06/04 12:23:28 packets on eth0: 31
2026/06/04 12:23:29 packets on eth0: 31
2026/06/04 12:23:30 packets on eth0: 31
2026/06/04 12:23:31 packets on eth0: 31
2026/06/04 12:23:32 packets on eth0: 45
2026/06/04 12:23:33 packets on eth0: 45
```

## Links
- https://github.com/boratanrikulu/gobee
