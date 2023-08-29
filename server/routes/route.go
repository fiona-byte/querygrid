package routes

import (
	"github.com/devylab/querygrid/pkg/config"
	"github.com/devylab/querygrid/pkg/database"
	"github.com/devylab/querygrid/pkg/middlewares"
	"github.com/gin-gonic/gin"
)

type route struct {
	router     *gin.Engine
	public     *gin.RouterGroup
	private    *gin.RouterGroup
	db         *database.Database
	conf       config.Config
	permission *middlewares.Permission
}

func NewRoute(publicRoute, privateRoute *gin.RouterGroup, router *gin.Engine, db *database.Database, conf config.Config) *route {
	permissions := middlewares.NewPermission(db, conf)

	return &route{
		router:     router,
		public:     publicRoute,
		private:    privateRoute,
		db:         db,
		conf:       conf,
		permission: permissions,
	}
}
func (r *route) MapUrls() {
	r.UserRoutes()
	r.ProjectRoutes()

	r.router.NoRoute(NotFound)
}

func NotFound(c *gin.Context) {
	c.File("./admin")
}
