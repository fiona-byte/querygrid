package main

import (
	cache2 "github.com/devylab/querygrid/pkg/cache"
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

	// CACHE
	cache := cache2.NewCache()

	ginMode(conf)
	router := gin.Default()
	router.Use(gzip.Gzip(gzip.DefaultCompression))
	// router.SetTrustedProxies(strings.Split(constants.TrustedProxies, ","))
	router.Use(middlewares.Secure(conf.AppEnv))

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	router.Use(cors.New(corsConfig))

	router.Use(middlewares.StaticFileCache())
	router.Use(static.Serve("/", static.LocalFile("./admin", true)))
	router.Use(static.Serve("/locales", static.LocalFile("./locales", true)))

	publicRoute := router.Group("/api")
	privateRoute := router.Group("/api")
	privateRoute.Use(middlewares.Authentication(conf))

	newRoutes := routes.NewRoute(&routes.RouteConfig{
		Public:  publicRoute,
		Private: privateRoute,
		Router:  router,
		DB:      dbCon,
		Config:  conf,
		Cache:   cache,
	})
	newRoutes.MapUrls()

	panic(router.Run(utils.GetPort(conf.Port)))
}
