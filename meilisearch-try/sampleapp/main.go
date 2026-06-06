package main

import (
	"encoding/json"
	"fmt"

	"github.com/meilisearch/meilisearch-go"
)

type Book struct {
	ID     int    `json:"id"`
	Title  string `json:"title"`
	Author string `json:"author"`
}

func main() {
	client := meilisearch.New("http://127.0.0.1:7700", meilisearch.WithAPIKey("masterKey"))

	// ヘルスチェック
	health, err := client.Health()
	if err != nil {
		panic(err)
	}
	fmt.Println("status:", health.Status)

	// サンプルデータ
	books := []Book{
		{ID: 1, Title: "Go言語入門", Author: "Alice"},
		{ID: 2, Title: "Meilisearch実践", Author: "Bob"},
		{ID: 3, Title: "Docker完全ガイド", Author: "Carol"},
	}

	// データ投入
	task, err := client.Index("books").AddDocuments(books, &meilisearch.DocumentOptions{})
	if err != nil {
		panic(err)
	}
	fmt.Printf("Task UID: %d\n", task.TaskUID)

	// タスク完了待ち
	if _, err = client.WaitForTask(task.TaskUID, 0); err != nil {
		panic(err)
	}

	// 検索
	result, err := client.Index("books").Search("go", &meilisearch.SearchRequest{})
	if err != nil {
		panic(err)
	}
	fmt.Println("Search Result:")
	for _, hit := range result.Hits {
		b, _ := json.MarshalIndent(hit, "", "  ")
		fmt.Println(string(b))
	}
}
