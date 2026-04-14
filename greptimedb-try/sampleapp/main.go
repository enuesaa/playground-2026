package main

import (
	"context"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"
	"go.opentelemetry.io/otel/sdk/trace"
)

func main() {
	ctx := context.Background()

	// exporter（OTLP HTTP）
	exp, _ := otlptracehttp.New(ctx,
		otlptracehttp.WithEndpoint("localhost:4000"),
		otlptracehttp.WithURLPath("/v1/otlp/v1/traces"),
		otlptracehttp.WithHeaders(map[string]string{
			"X-Greptime-Pipeline-Name": "greptime_trace_v1",
		}),
		otlptracehttp.WithInsecure(),
	)

	tp := trace.NewTracerProvider(trace.WithBatcher(exp))
	otel.SetTracerProvider(tp)

	tr := otel.Tracer("echo-sample")

	e := echo.New()

	e.GET("/", func(c echo.Context) error {
		ctx, span := tr.Start(c.Request().Context(), "handler")
		defer span.End()
		time.Sleep(1 * time.Second)
		_, span2 := tr.Start(ctx, "handler in handler")
		defer span2.End()
		time.Sleep(2 * time.Second)
		return c.String(http.StatusOK, "ok")
	})
	e.GET("/aaa", func(c echo.Context) error {
		ctx, span := tr.Start(c.Request().Context(), "handler")
		defer span.End()
		time.Sleep(1 * time.Second)
		_, span2 := tr.Start(ctx, "handler in handler")
		defer span2.End()
		time.Sleep(1 * time.Second)
		return c.String(http.StatusOK, "ok")
	})

	e.Start(":8080")
}
