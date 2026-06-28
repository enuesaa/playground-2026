package main

import (
	"fmt"
	"net/http"
	"os"
	"time"
)

var instanceId = os.Getenv("CLOUDFLARE_DURABLE_OBJECT_ID")

func main() {
	router := http.NewServeMux()
	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hi, I'm a container. my instance ID is: %s", instanceId)
	})
	router.HandleFunc("/wait30seconds", func(w http.ResponseWriter, r *http.Request) {
		time.Sleep(30 * time.Second)
		fmt.Fprintf(w, "Hi wait30seconds")
	})
	server := &http.Server{
		Addr:    ":8080",
		Handler: router,
	}
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		panic(err)
	}
}
