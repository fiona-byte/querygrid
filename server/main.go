package main

import (
	"strings"

	"github.com/devylab/querygrid/pkg/config"
	"github.com/devylab/querygrid/pkg/database"
	"github.com/devylab/querygrid/pkg/middlewares"
	"github.com/devylab/querygrid/pkg/utils"
	"github.com/devylab/querygrid/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func ginMode(conf config.Config) {
	if conf.AppEnv == "production" {
		gin.SetMode(gin.ReleaseMode)
	} else if conf.AppEnv == "test" {
		gin.SetMode(gin.TestMode)
	} else {
		gin.SetMode(gin.DebugMode)
	}
}

func main() {
	conf := config.LoadConfig()

	// DATABASE CONNECTION
	dbCon := database.Connect(conf)

	ginMode(conf)
	router := gin.Default()
	router.Use(gzip.Gzip(gzip.DefaultCompression))
	// router.SetTrustedProxies(strings.Split(constants.TrustedProxies, ","))
	router.Use(middlewares.Secure(conf.AppEnv))

	config := cors.DefaultConfig()
	corsArr := strings.Split(conf.CorsOrigins, ",")
	config.AllowOrigins = corsArr
	router.Use(cors.New(config))

	router.Use(static.Serve("/", static.LocalFile("./admin", true)))
	router.Use(static.Serve("/locales", static.LocalFile("./locales", true)))

	publicRoute := router.Group("/api")
	privateRoute := router.Group("/api")
	privateRoute.Use(middlewares.Authentication(conf))

	routes := routes.NewRoute(publicRoute, privateRoute, router, dbCon, conf)
	routes.MapUrls()

	panic(router.Run(utils.GetPort(conf.Port)))
}
