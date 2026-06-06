package main

import (
	"context"
	"fmt"
	"time"

	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"
	"go.temporal.io/sdk/workflow"
)

func main() {
	c, err := client.Dial(client.Options{})
	if err != nil {
		panic(err)
	}
	defer c.Close()

	w := worker.New(c, "hello", worker.Options{})

	w.RegisterWorkflow(SampleWorkflow)
	w.RegisterActivity(SampleActivity)

	if err := w.Run(worker.InterruptCh()); err != nil {
		panic(err)
	}
}

func SampleWorkflow(ctx workflow.Context, name string) (string, error) {
	var result string

	ctx = workflow.WithActivityOptions(ctx, workflow.ActivityOptions{
		StartToCloseTimeout: 10 * time.Second,
	})
	err := workflow.ExecuteActivity(ctx, SampleActivity, name).Get(ctx, &result)

	if err != nil {
		return "", err
	}
	return result, nil
}

func SampleActivity(ctx context.Context, name string) (string, error) {
	return fmt.Sprintf("Hello %s!", name), nil
}
