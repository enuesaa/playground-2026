# Charm log

- 思ったよりよくできている
- これはだいぶ良さそう

```bash
➜ go run .
2026/06/10 21:07:45 INFO Hello
2026/06/10 21:07:45 INFO Hello a=aaa b=bbb c=111
2026/06/10 21:07:45 INFO <go-charm-log-try/main.go:25> test
  a=
  │ aaaa
  │ aaaaaaaaaaaaaaaaa
  │ aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  │ aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

  b=
  │ aaaa
  │ aaaaaaaaaaaaaaaab
  │ aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  │ aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
9:07PM INFO <go-charm-log-try/main.go:33> hey: john a=aaa
9:07PM INFO <go-charm-log-try/main.go:34> hey: john b=bbb
```

### Links
- https://github.com/charmbracelet/log
