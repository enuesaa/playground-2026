package main

import (
	"context"
	"fmt"

	"go.temporal.io/sdk/client"
)

func main() {
	c, err := client.Dial(client.Options{})
	if err != nil {
		panic(err)
	}
	defer c.Close()

	ctx := context.Background()

	_, err = c.ScheduleClient().Create(ctx, client.ScheduleOptions{
		ID: "test01",
		Spec: client.ScheduleSpec{
			CronExpressions: []string{
				"*/10 * * * *",
			},
		},
		Action: &client.ScheduleWorkflowAction{
			Workflow:  "SampleWorkflow",
			TaskQueue: "main",
			Args: []interface{}{
				"John",
			},
		},
	})
	if err != nil {
		panic(err)
	}

	fmt.Println("schedule created")
}
