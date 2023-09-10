package controllers

import (
	"github.com/devylab/querygrid/models"
	"github.com/devylab/querygrid/pkg/config"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
)

type CollectionHandler struct {
	collectionRepo models.CollectionRepository
	config         config.Config
}

func NewCollectionHandler(collectionRepo models.CollectionRepository, config config.Config) *CollectionHandler {
	return &CollectionHandler{
		collectionRepo: collectionRepo,
		config:         config,
	}
}

func (h *CollectionHandler) GetCollections(c *gin.Context) {
	userID := c.MustGet("userID").(primitive.ObjectID)
	projectId := c.Param("projectId")

	collections, collectionErr := h.collectionRepo.GetCollections(projectId, userID)
	if collectionErr != nil {
		c.SecureJSON(collectionErr.Status, collectionErr)
		return
	}

	c.SecureJSON(http.StatusOK, &gin.H{
		"status":  http.StatusOK,
		"message": "Collections",
		"data":    collections,
	})
}
