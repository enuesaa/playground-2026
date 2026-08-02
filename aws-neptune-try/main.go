package main

import (
	"os"
	"context"
	"fmt"
	awsconfig "github.com/aws/aws-sdk-go-v2/config"
	"net/http"
	"strings"
	"time"

	gremlingo "github.com/apache/tinkerpop/gremlin-go/v3/driver"
	signv4 "github.com/aws/aws-sdk-go-v2/aws/signer/v4"
)

var neptuneEndpoint = os.Getenv("NEPTUNE_ENDPOINT")
var connString = "wss://" + neptuneEndpoint + ":8182/gremlin"
const emptyStringSHA256 = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"

func main() {
	req, err := http.NewRequest(http.MethodGet, connString, strings.NewReader(""))
	if err != nil {
		panic(err)
	}
	cfg, err := awsconfig.LoadDefaultConfig(context.Background())
	if err != nil {
		panic(err)
	}
	cr, err := cfg.Credentials.Retrieve(context.Background())
	if err != nil {
		panic(err)
	}
	if err := signv4.NewSigner().SignHTTP(context.Background(), cr, req, emptyStringSHA256, "neptune-db", cfg.Region, time.Now()); err != nil {
		panic(err)
	}

	conn, err := gremlingo.NewDriverRemoteConnection(
		connString,
		func(settings *gremlingo.DriverRemoteConnectionSettings) {
			settings.TraversalSource = "g"
			settings.AuthInfo = gremlingo.HeaderAuthInfo(req.Header)
		},
	)
	if err != nil {
		panic(err)
	}
	defer conn.Close()

	g := gremlingo.Traversal_().With(conn)

	result, err := g.V().Limit(10).ToList()
	if err != nil {
		panic(err)
	}
	for _, v := range result {
		fmt.Println(v)
	}
}
