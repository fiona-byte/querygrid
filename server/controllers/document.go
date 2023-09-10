package controllers

import (
	"github.com/devylab/querygrid/models"
	"github.com/devylab/querygrid/pkg/config"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
)

type DocumentHandler struct {
	documentRepo models.DocumentRepository
	config       config.Config
}

func NewDocumentHandler(documentRepo models.DocumentRepository, config config.Config) *DocumentHandler {
	return &DocumentHandler{
		documentRepo: documentRepo,
		config:       config,
	}
}

func (h *DocumentHandler) GetDocuments(c *gin.Context) {
	userID := c.MustGet("userID").(primitive.ObjectID)
	projectId := c.Param("projectId")
	collection := c.Param("collection")

	documents, documentErr := h.documentRepo.GetDocuments(projectId, collection, userID)
	if documentErr != nil {
		c.SecureJSON(documentErr.Status, documentErr)
		return
	}

	c.SecureJSON(http.StatusOK, &gin.H{
		"status":  http.StatusOK,
		"message": "Documents",
		"data":    documents,
	})
}

func (h *DocumentHandler) GetDocument(c *gin.Context) {
	userID := c.MustGet("userID").(primitive.ObjectID)
	projectId := c.Param("projectId")
	collection := c.Param("collection")
	documentId := c.Param("document")

	document, documentErr := h.documentRepo.GetDocument(projectId, collection, documentId, userID)
	if documentErr != nil {
		c.SecureJSON(documentErr.Status, documentErr)
		return
	}

	c.SecureJSON(http.StatusOK, &gin.H{
		"status":  http.StatusOK,
		"message": "Document",
		"data":    document,
	})
}
