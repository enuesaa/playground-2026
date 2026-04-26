package main

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
)
import "github.com/newrelic/go-agent/v3/newrelic"
import "github.com/newrelic/go-agent/v3/integrations/nrecho-v4"

func main() {
	nrapp, err := newrelic.NewApplication(
		newrelic.ConfigAppName("sampleapp"),
		newrelic.ConfigLicense(LICENSE_KEY),
		newrelic.ConfigAppLogForwardingEnabled(true),
		newrelic.ConfigAIMonitoringEnabled(true),
		newrelic.ConfigCustomInsightsEventsMaxSamplesStored(10000),
	)
	if err != nil {
		panic(err)
	}
	e := echo.New()
	e.Use(nrecho.Middleware(nrapp))

	e.GET("/", func(c echo.Context) error {
		txn := nrapp.StartTransaction("roothandler")
		defer txn.End()
		time.Sleep(1 * time.Second)
		return c.String(http.StatusOK, "ok")
	})
	e.GET("/aaa", func(c echo.Context) error {
		time.Sleep(1 * time.Second)
		return c.String(http.StatusOK, "ok")
	})

	e.Start(":8080")
}
