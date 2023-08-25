package routes

import (
	"github.com/devylab/querygrid/controllers"
	"github.com/devylab/querygrid/repositories"
)

func (r *route) ProjectRoutes() {
	projectRepo := repositories.NewProjectRepo(r.db, r.conf)
	controller := controllers.NewProjectHandler(projectRepo, r.conf)

	r.private.POST("/project", controller.CreateProject)
	r.private.GET("/projects", controller.GetAll)
	r.private.GET("/project/count", controller.ProjectCount)
}
