package main

import (
	"fmt"

	"github.com/creack/pty"
)

func main() {
	ptmx, tty, err := pty.Open()
	if err != nil {
		panic(err)
	}
	defer ptmx.Close()
	defer tty.Close()

	// 書き込み
	tty.Write([]byte("aa"))

	// 読む
	buf := make([]byte, 1024)
	n, err := ptmx.Read(buf)
	if err != nil {
		panic(err)
	}
	fmt.Print(string(buf[:n]))
}
