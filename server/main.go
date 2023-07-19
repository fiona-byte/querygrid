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
	defer dbCon.DB.Close()

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

	publicRoute := router.Group("/")

	routes := routes.NewRoute(publicRoute, router, dbCon)
	routes.MapUrls()

	panic(router.Run(utils.GetPort(conf.Port)))
}
