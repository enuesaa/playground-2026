package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"google.golang.org/appengine"
)

func main() {
	app := echo.New()
	app.GET("/aaa", func(c echo.Context) error {
		return c.String(200, "aaa")
	})
	app.GET("/bbb", func(c echo.Context) error {
		return c.String(200, "bbb")
	})

	http.Handle("/", app)
	appengine.Main()
}
