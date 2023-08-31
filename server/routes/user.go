package routes

import (
	"github.com/devylab/querygrid/controllers"
	"github.com/devylab/querygrid/repositories"
)

func (r *route) UserRoutes() {
	userRepo := repositories.NewUserRepo(r.db, r.conf)
	controller := controllers.NewUserHandler(userRepo, r.conf)

	// r.public.POST("/users/user", controller.Create)
	r.public.POST("/users/login", controller.Login)
	r.private.GET("/users/me", controller.CurrentUser)
	r.public.POST("/users/refresh", controller.Refresh)
	r.public.POST("/setup", controller.Setup)
	r.public.GET("/install", controller.Install)
}
