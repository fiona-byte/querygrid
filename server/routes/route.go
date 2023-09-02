package routes

import (
	cache2 "github.com/devylab/querygrid/pkg/cache"
	"github.com/devylab/querygrid/pkg/config"
	"github.com/devylab/querygrid/pkg/database"
	"github.com/devylab/querygrid/pkg/middlewares"
	"github.com/gin-gonic/gin"
)

type RouteConfig struct {
	Router     *gin.Engine
	Public     *gin.RouterGroup
	Private    *gin.RouterGroup
	DB         *database.Database
	Config     config.Config
	Permission *middlewares.Permission
	Cache      *cache2.Cache
}

func NewRoute(routeConfig *RouteConfig) *RouteConfig {
	permissions := middlewares.NewPermission(routeConfig.DB, routeConfig.Config, routeConfig.Cache)
	routeConfig.Permission = permissions
	return routeConfig
}

func (r *RouteConfig) MapUrls() {
	r.UserRoutes()
	r.ProjectRoutes()

	r.Router.NoRoute(NotFound)
}

func NotFound(c *gin.Context) {
	c.File("./admin")
}
