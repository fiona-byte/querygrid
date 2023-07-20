package controllers

import (
	"net/http"

	"github.com/devylab/querygrid/models"
	"github.com/devylab/querygrid/pkg/resterror"
	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	userRepo models.UserRepository
}

func NewUserHandler(userRepo models.UserRepository) *UserHandler {
	return &UserHandler{
		userRepo: userRepo,
	}
}

func (h *UserHandler) Create(c *gin.Context) {
	var newUser models.NewUser
	if err := c.ShouldBindJSON(&newUser); err != nil {
		restErr := resterror.BadJSONRequest()
		c.SecureJSON(restErr.Status, restErr)
		return
	}

	if err := h.userRepo.Create(newUser); err != nil {
		c.SecureJSON(err.Status, err)
		return
	}

	c.SecureJSON(http.StatusCreated, &gin.H{
		"status":  http.StatusCreated,
		"message": "Account Created",
		"data":    nil,
	})
}
