package main

import (
	"context"
	"fmt"
	"time"

	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"
	"go.temporal.io/sdk/workflow"
)

// これは Worker
// ここに workflow や activity の定義を書く。定義というか実際のコードになるけど。
// で、GUI 等でその workflow を呼び出す。
// すると、ここで書いた関数が、このプロセスで実行される（Worker）
func main() {
	// Temporal Server (localhost:7233) へつなぐ
	c, err := client.Dial(client.Options{})
	if err != nil {
		panic(err)
	}
	defer c.Close()

	w := worker.New(c, "main", worker.Options{})

	w.RegisterWorkflow(SampleWorkflow)
	w.RegisterActivity(SayHelloActivity)
	w.RegisterActivity(SayByeActivity)

	if err := w.Run(worker.InterruptCh()); err != nil {
		panic(err)
	}
}

func SampleWorkflow(ctx workflow.Context, name string) (string, error) {
	var result string

	ctx = workflow.WithActivityOptions(ctx, workflow.ActivityOptions{
		StartToCloseTimeout: 10 * time.Second,
	})
	if err := workflow.ExecuteActivity(ctx, SayHelloActivity, name).Get(ctx, &result); err != nil {
		return "", err
	}
	if err := workflow.Sleep(ctx, 50*time.Second); err != nil {
		return "", err
	}
	if err := workflow.ExecuteActivity(ctx, SayByeActivity, name).Get(ctx, &result); err != nil {
		return "", err
	}
	return result, nil
}

func SayHelloActivity(ctx context.Context, name string) (string, error) {
	return fmt.Sprintf("Hello %s!", name), nil
}

func SayByeActivity(ctx context.Context, name string) (string, error) {
	return fmt.Sprintf("Bye %s!", name), nil
}
