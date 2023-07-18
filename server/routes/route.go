package routes

import (
	"github.com/devylab/querygrid/pkg/database"
	"github.com/gin-gonic/gin"
)

type route struct {
	router *gin.Engine
	public *gin.RouterGroup
	db     *database.Database
}

func NewRoute(publicRoute *gin.RouterGroup, router *gin.Engine, db *database.Database) *route {
	return &route{
		router: router,
		public: publicRoute,
		db:     db,
	}
}
func (r *route) MapUrls() {
	r.UserRoutes()

	r.router.NoRoute(NotFound)
}

func NotFound(c *gin.Context) {
	// restErr := resterror.NotFound("Route Not Found")
	// c.SecureJSON(restErr.Status, restErr)
}
