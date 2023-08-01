package controllers

import (
	"net/http"

	"github.com/devylab/querygrid/models"
	"github.com/devylab/querygrid/pkg/config"
	"github.com/devylab/querygrid/pkg/constants"
	"github.com/devylab/querygrid/pkg/resterror"
	"github.com/devylab/querygrid/pkg/utils"
	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	userRepo models.UserRepository
	config   config.Config
}

func NewUserHandler(userRepo models.UserRepository, config config.Config) *UserHandler {
	return &UserHandler{
		userRepo: userRepo,
		config:   config,
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

func (h *UserHandler) Login(c *gin.Context) {
	origin := c.GetHeader("origin")
	var loginUser models.LoginUser
	if err := c.ShouldBindJSON(&loginUser); err != nil {
		restErr := resterror.BadJSONRequest()
		c.SecureJSON(restErr.Status, restErr)
		return
	}

	data, err := h.userRepo.Login(loginUser)
	if err != nil {
		c.SecureJSON(err.Status, err)
		return
	}

	domain := utils.GetDomain(origin)
	isProduction := utils.IsProduction(h.config.AppEnv)
	c.SetCookie(constants.ACCESS_TOKEN_KEY, data.AccessToken, 3600, "/", domain, isProduction, isProduction)
	c.SetCookie(constants.REFRESH_TOKEN_KEY, data.RefreshToken, 3600, "/", domain, isProduction, isProduction)
	c.SetCookie(constants.SECRET_KEY, data.Secret, 3600, "/", domain, isProduction, isProduction)

	c.SecureJSON(http.StatusOK, &gin.H{
		"status":  http.StatusOK,
		"message": "Login",
		"data":    nil,
	})
}

func (h *UserHandler) CurrentUser(c *gin.Context) {
	userID := c.MustGet("userID").(string)

	data, err := h.userRepo.CurrentUser(userID)
	if err != nil {
		c.SecureJSON(err.Status, err)
		return
	}

	c.SecureJSON(http.StatusOK, &gin.H{
		"status":  http.StatusOK,
		"message": "Me",
		"data":    data,
	})
}
