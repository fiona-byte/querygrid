package routes

import "github.com/gin-gonic/gin"

type route struct {
	router *gin.Engine
	public *gin.RouterGroup
}

func NewRoute(publicRoute *gin.RouterGroup, router *gin.Engine) *route {
	return &route{
		router: router,
		public: publicRoute,
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
