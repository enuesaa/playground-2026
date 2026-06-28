package main

import (
	"encoding/json"
	"strings"
	"syscall/js"
)

type ReplaceRequest struct {
	Text string `json:"text"`
	Old  string `json:"old"`
	New  string `json:"new"`
}
func replace(this js.Value, args []js.Value) any {
	if len(args) != 1 {
		return "usage: replace({text, old, new})"
	}
	var req ReplaceRequest
	err := json.Unmarshal([]byte(args[0].String()), &req)
	if err != nil {
		return err.Error()
	}
	return strings.ReplaceAll(req.Text, req.Old, req.New)
}

func main() {
	fns := js.ValueOf(map[string]any{
		"replaceString": js.FuncOf(replace),
	})
	poc := js.ValueOf(map[string]any{
		"fns": fns,
	})
	js.Global().Set("poc", poc)

	select {}
}
