package main

import (
	"os"
	"strings"

	"github.com/devylab/querygrid/src/common/constants"
	"github.com/devylab/querygrid/src/middlewares"
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
)

func main() {
	gin.SetMode(constants.GinMode)
	router := gin.Default()
	router.Use(gzip.Gzip(gzip.DefaultCompression))
	// router.SetTrustedProxies(strings.Split(constants.TrustedProxies, ","))
	router.Use(middlewares.Secure())

	config := cors.DefaultConfig()
	corsArr := strings.Split(constants.CorsOrigins, ",")
	config.AllowOrigins = corsArr
	router.Use(cors.New(config))

	port := os.Getenv("PORT")
	if port == "" {
		port = constants.Port
	}
	panic(router.Run(":" + port))
}
