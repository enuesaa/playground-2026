package main

import (
	"context"
	"fmt"

	"cloud.google.com/go/spanner"
	"google.golang.org/api/iterator"
)

var db = "projects/project-id/instances/instance-id/databases/dbname"

func main() {
	ctx := context.Background()
	client, err := spanner.NewClient(ctx, db)
	if err != nil {
		panic(err)
	}
	defer client.Close()

	fmt.Println("=== Read ===")
	stmt := spanner.Statement{
		SQL: `
			SELECT UserId, Email
			FROM Users
			LIMIT 2
		`,
	}
	iter := client.Single().Query(ctx, stmt)
	defer iter.Stop()

	for {
		row, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			panic(err)
		}
		var userID int64
		var email string

		if err := row.Columns(&userID, &email); err != nil {
			panic(err)
		}
		fmt.Printf("UserId=%d Email=%s\n", userID, email)
	}
	fmt.Println("=== Insert ===")

	mutation := spanner.Insert(
		"Users",
		[]string{"UserId", "Email"},
		[]any{8, "exampletest@example.com"},
	)
	if err != nil {
		panic(err)
	}
	if _, err := client.Apply(ctx, []*spanner.Mutation{mutation}); err != nil {
		panic(err)
	}
	fmt.Println("Insert completed.")
}
