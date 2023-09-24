package routes

import (
	"github.com/devylab/querygrid/controllers"
	"github.com/devylab/querygrid/pkg/constants"
	"github.com/devylab/querygrid/repositories"
)

func (r *RouteConfig) DocumentRoutes() {
	documentRepo := repositories.NewDocumentRepo(r.DB, r.Config)
	controller := controllers.NewDocumentHandler(documentRepo, r.Config)

	r.Private.POST("/document/:projectId", r.Permission.HasProjectPermission(constants.Role.Database, constants.CREATE), controller.CreateDocument)
	r.Private.PATCH("/document/:projectId", r.Permission.HasProjectPermission(constants.Role.Database, constants.UPDATE), controller.UpdateDocument)
	r.Private.DELETE("/document/:projectId", r.Permission.HasProjectPermission(constants.Role.Database, constants.DELETE), controller.DeleteDocument)
	r.Private.GET("/document/:projectId/:collection", r.Permission.HasProjectPermission(constants.Role.Database, constants.VIEW_ALL), controller.GetDocuments)
	r.Private.GET("/document/:projectId/:collection/:document", r.Permission.HasProjectPermission(constants.Role.Database, constants.READ), controller.GetDocument)
}
