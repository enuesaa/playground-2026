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

	workflowOptions := client.StartWorkflowOptions{
		ID:        "hello_workflowID",
		TaskQueue: "hello",
	}
	we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, "SampleWorkflow", "World")
	if err != nil {
		panic(err)
	}
	fmt.Println("started:", we.GetID(), "runID: ", we.GetRunID())

	var result string
	if err := we.Get(context.Background(), &result); err != nil {
		panic(err)
	}
	fmt.Println("result:", result)
}
