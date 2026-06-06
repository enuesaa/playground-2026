package main

import (
	"context"
	"fmt"

	"go.temporal.io/sdk/client"
)

// これは Workflow を実行するトリガー。
// EventBridge に相当
func main() {
	c, err := client.Dial(client.Options{})
	if err != nil {
		panic(err)
	}
	defer c.Close()

	ctx := context.Background()
	opts := client.StartWorkflowOptions{
		ID:        "hello_workflowID3", // 同じIDのものを指定したらまとめられるっぽい。FIFO的な
		TaskQueue: "hello",
	}
	we, err := c.ExecuteWorkflow(ctx, opts, "SampleWorkflow", "World")
	if err != nil {
		panic(err)
	}
	fmt.Println("started:", we.GetID(), "runID: ", we.GetRunID())

	// 下記は結果の取得に必要なだけで、必ずしも実行する必要はない。
	// むしろ長期間のワークフローであれば待機時間が大変なことになる

	// var result string
	// if err := we.Get(ctx, &result); err != nil {
	// 	panic(err)
	// }
	// fmt.Println("result:", result)
}
