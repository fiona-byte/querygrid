package controllers

import (
	"github.com/devylab/querygrid/models"
	"github.com/devylab/querygrid/pkg/config"
	"github.com/devylab/querygrid/pkg/resterror"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
)

type ProjectHandler struct {
	projectRepo models.ProjectRepository
	config      config.Config
}

func NewProjectHandler(projectRepo models.ProjectRepository, config config.Config) *ProjectHandler {
	return &ProjectHandler{
		projectRepo: projectRepo,
		config:      config,
	}
}

func (h *ProjectHandler) CreateProject(c *gin.Context) {
	userID := c.MustGet("userID").(primitive.ObjectID)
	var newProject models.NewProject
	if err := c.ShouldBindJSON(&newProject); err != nil {
		restErr := resterror.BadJSONRequest()
		c.SecureJSON(restErr.Status, restErr)
		return
	}

	project, err := h.projectRepo.CreateProject(newProject, userID)
	if err != nil {
		c.SecureJSON(err.Status, err)
		return
	}

	c.SecureJSON(http.StatusCreated, &gin.H{
		"status":  http.StatusCreated,
		"message": "Project Created",
		"data":    project,
	})
}

func (h *ProjectHandler) GetAll(c *gin.Context) {
	userID := c.MustGet("userID").(primitive.ObjectID)
	offset := c.Query("offset")
	search := c.Query("search")

	project, projectErr := h.projectRepo.GetAll(userID, offset, search)
	if projectErr != nil {
		c.SecureJSON(projectErr.Status, projectErr)
		return
	}

	c.SecureJSON(http.StatusOK, &gin.H{
		"status":  http.StatusOK,
		"message": "Projects",
		"data":    project,
	})
}

func (h *ProjectHandler) ProjectCount(c *gin.Context) {
	userID := c.MustGet("userID").(primitive.ObjectID)

	projectCount, projectCountErr := h.projectRepo.ProjectCount(userID)
	if projectCountErr != nil {
		c.SecureJSON(projectCountErr.Status, projectCountErr)
		return
	}

	c.SecureJSON(http.StatusOK, &gin.H{
		"status":  http.StatusOK,
		"message": "Project count",
		"data": &gin.H{
			"count": projectCount,
		},
	})
}
