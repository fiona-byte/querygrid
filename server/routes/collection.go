package routes

import (
	"github.com/devylab/querygrid/controllers"
	"github.com/devylab/querygrid/pkg/constants"
	"github.com/devylab/querygrid/repositories"
)

func (r *RouteConfig) CollectionRoutes() {
	collectionRepo := repositories.NewCollectionRepo(r.DB, r.Config)
	controller := controllers.NewCollectionHandler(collectionRepo, r.Config)

	r.Private.GET("/collections/:projectId", r.Permission.HasProjectPermission(constants.Role.Database, constants.VIEW_ALL), controller.GetCollections)
	r.Private.POST("/collections/:projectId/:collection", r.Permission.HasProjectPermission(constants.Role.Database, constants.READ), controller.ValidateCollection)
	r.Private.POST("/collections/create/:projectId", r.Permission.HasProjectPermission(constants.Role.Database, constants.CREATE), controller.CreateCollection)
}
