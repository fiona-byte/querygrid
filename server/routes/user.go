package routes

import (
	"github.com/devylab/querygrid/controllers"
	"github.com/devylab/querygrid/repositories"
)

func (r *RouteConfig) UserRoutes() {
	userRepo := repositories.NewUserRepo(r.DB, r.Config, r.Cache)
	controller := controllers.NewUserHandler(userRepo, r.Config)

	// r.public.POST("/users/user", controller.Create)
	r.Public.POST("/users/login", controller.Login)
	r.Private.GET("/users/me", controller.CurrentUser)
	r.Public.POST("/users/refresh", controller.Refresh)
	r.Public.POST("/setup", controller.Setup)
	r.Public.GET("/install", controller.Install)
}
