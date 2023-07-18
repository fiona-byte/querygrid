package controllers

import (
	"github.com/devylab/querygrid/models"
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

func (h *UserHandler) CreateUser(c *gin.Context) {
	// if user, err := h.userRepo.FindByID(1); err != nil {
	// 	fmt.Println("Error", user)
	// }

	// w.Write([]byte("Hello, World"))
}
