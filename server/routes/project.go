package routes

import (
	"github.com/devylab/querygrid/controllers"
	"github.com/devylab/querygrid/pkg/constants"
	"github.com/devylab/querygrid/repositories"
)

func (r *RouteConfig) ProjectRoutes() {
	projectRepo := repositories.NewProjectRepo(r.DB, r.Config)
	controller := controllers.NewProjectHandler(projectRepo, r.Config)

	r.Private.POST("/project", r.Permission.HasPermission(constants.PROJECT, constants.CREATE), controller.CreateProject)
	r.Private.GET("/projects", r.Permission.HasPermission(constants.PROJECT, constants.VIEW_ALL), controller.GetAll)
	r.Private.GET("/project/:projectId", r.Permission.HasPermission(constants.PROJECT, constants.READ), controller.GetById)
}
