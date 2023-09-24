package controllers

import (
	"github.com/devylab/querygrid/models"
	"github.com/devylab/querygrid/pkg/config"
	"github.com/devylab/querygrid/pkg/resterror"
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

func (h *CollectionHandler) ValidateCollection(c *gin.Context) {
	userID := c.MustGet("userID").(primitive.ObjectID)
	projectId := c.Param("projectId")
	collection := c.Param("collection")

	if collectionErr := h.collectionRepo.ValidateCollection(projectId, collection, userID); collectionErr != nil {
		c.SecureJSON(collectionErr.Status, collectionErr)
		return
	}

	c.SecureJSON(http.StatusOK, &gin.H{
		"status":  http.StatusOK,
		"message": "validate collection",
		"data":    nil,
	})
}

func (h *CollectionHandler) CreateCollection(c *gin.Context) {
	userID := c.MustGet("userID").(primitive.ObjectID)
	projectId := c.Param("projectId")
	var newCollection models.CreateCollection
	if err := c.ShouldBindJSON(&newCollection); err != nil {
		restErr := resterror.BadJSONRequest()
		c.SecureJSON(restErr.Status, restErr)
		return
	}

	if collectionErr := h.collectionRepo.CreateCollection(projectId, userID, newCollection); collectionErr != nil {
		c.SecureJSON(collectionErr.Status, collectionErr)
		return
	}

	c.SecureJSON(http.StatusOK, &gin.H{
		"status":  http.StatusOK,
		"message": "create collection",
		"data":    nil,
	})
}

func (h *CollectionHandler) DeleteCollection(c *gin.Context) {
	userID := c.MustGet("userID").(primitive.ObjectID)
	projectId := c.Param("projectId")
	collection := c.Param("collection")

	if collectionErr := h.collectionRepo.DeleteCollection(projectId, userID, collection); collectionErr != nil {
		c.SecureJSON(collectionErr.Status, collectionErr)
		return
	}

	c.SecureJSON(http.StatusOK, &gin.H{
		"status":  http.StatusOK,
		"message": "delete collection",
		"data":    nil,
	})
}
