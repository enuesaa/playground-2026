package main

import (
	"os"
	"time"

	"github.com/charmbracelet/log"
)

const longTextA = `aaaa
aaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`

const longTextB = `aaaa
aaaaaaaaaaaaaaaab
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`

func main() {
	log.Info("Hello")
	log.Info("Hello", "a", "aaa", "b", "bbb", "c", 111)

	log.SetReportCaller(true)
	log.Info("test", "a", longTextA, "b", longTextB)

	logger := log.NewWithOptions(os.Stdout, log.Options{
		ReportCaller: true,    // 呼び出し場所
		ReportTimestamp: true, // 先頭の timestamp をつけるか
		TimeFormat: time.Kitchen,
		Prefix: "hey",
	})
	logger.Info("john", "a", "aaa")
	logger.Info("john", "b", "bbb")
}
