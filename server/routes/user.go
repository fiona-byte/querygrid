package routes

import (
	"github.com/devylab/querygrid/controllers"
	"github.com/devylab/querygrid/repositories"
)

func (r *route) UserRoutes() {
	userRepo := repositories.NewUserRepo(r.db)
	controller := controllers.NewUserHandler(userRepo)

	r.public.POST("/oauth/register", controller.CreateUser)
}
