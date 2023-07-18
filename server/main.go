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
	"github.com/gin-gonic/gin"
)

func main() {
	conf := config.LoadConfig()

	// DATABASE CONNECTION
	dbCon := database.Connect(conf)
	defer dbCon.DB.Close()

	gin.SetMode(conf.Mode) // TODO: fix this
	router := gin.Default()
	router.Use(gzip.Gzip(gzip.DefaultCompression))
	// router.SetTrustedProxies(strings.Split(constants.TrustedProxies, ","))
	router.Use(middlewares.Secure(conf.AppEnv))

	config := cors.DefaultConfig()
	corsArr := strings.Split(conf.CorsOrigins, ",")
	config.AllowOrigins = corsArr
	router.Use(cors.New(config))

	publicRoute := router.Group("/")

	routes := routes.NewRoute(publicRoute, router, dbCon)
	routes.MapUrls()

	panic(router.Run(utils.GetPort(conf.Port)))
}
