package controllers

import (
	"github.com/devylab/querygrid/models"
	"github.com/devylab/querygrid/pkg/config"
	"github.com/devylab/querygrid/pkg/constants"
	"github.com/devylab/querygrid/pkg/jwt"
	"github.com/devylab/querygrid/pkg/resterror"
	"github.com/devylab/querygrid/pkg/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
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

	if err := h.userRepo.CreateUser(newUser); err != nil {
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
	c.SetCookie(constants.ACCESS_TOKEN_KEY, data.AccessToken, constants.OneHour, "/", domain, isProduction, isProduction)
	c.SetCookie(constants.REFRESH_TOKEN_KEY, data.RefreshToken, constants.OneHour, "/", domain, isProduction, isProduction)
	c.SetCookie(constants.SECRET_KEY, data.Secret, constants.OneHour, "/", domain, isProduction, isProduction)

	c.SecureJSON(http.StatusOK, &gin.H{
		"status":  http.StatusOK,
		"message": "Login",
		"data":    nil,
	})
}

func (h *UserHandler) CurrentUser(c *gin.Context) {
	userID := c.MustGet("userID").(primitive.ObjectID)

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

func (h *UserHandler) Refresh(c *gin.Context) {
	var refreshToken, secret string
	var err error
	origin := c.GetHeader("origin")
	badRequest := resterror.BadRequest("bad token", "bad token")

	if secret, err = c.Cookie(constants.SECRET_KEY); err != nil {
		c.SecureJSON(badRequest.Status, badRequest)
		return
	}

	if refreshToken, err = c.Cookie(constants.REFRESH_TOKEN_KEY); err != nil {
		c.SecureJSON(badRequest.Status, badRequest)
		return
	}

	data, verifyErr := jwt.VerifyJWT(refreshToken, h.config.JWTSecret)
	if verifyErr != nil {
		c.SecureJSON(badRequest.Status, badRequest)
		return
	}

	if data.Secret != secret {
		c.SecureJSON(badRequest.Status, badRequest)
		return
	}

	userToken, generateUserTokenErr := models.GenerateUserToken(data.User, h.config.JWTSecret)
	if generateUserTokenErr != nil {
		c.SecureJSON(generateUserTokenErr.Status, generateUserTokenErr)
		return
	}

	domain := utils.GetDomain(origin)
	isProduction := utils.IsProduction(h.config.AppEnv)
	c.SetCookie(constants.ACCESS_TOKEN_KEY, userToken.AccessToken, constants.OneHour, "/", domain, isProduction, isProduction)
	c.SetCookie(constants.REFRESH_TOKEN_KEY, userToken.RefreshToken, constants.OneHour, "/", domain, isProduction, isProduction)
	c.SetCookie(constants.SECRET_KEY, userToken.Secret, constants.OneHour, "/", domain, isProduction, isProduction)

	c.SecureJSON(http.StatusOK, &gin.H{
		"status":  http.StatusOK,
		"message": "Refresh",
		"data":    nil,
	})
}

func (h *UserHandler) Setup(c *gin.Context) {
	origin := c.GetHeader("origin")
	var newUser models.NewUser
	if err := c.ShouldBindJSON(&newUser); err != nil {
		restErr := resterror.BadJSONRequest()
		c.SecureJSON(restErr.Status, restErr)
		return
	}

	data, err := h.userRepo.Setup(newUser)
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
		"message": "Setup",
		"data":    nil,
	})
}

func (h *UserHandler) Install(c *gin.Context) {
	data, err := h.userRepo.Install()
	if err != nil {
		c.SecureJSON(err.Status, err)
		return
	}

	c.SecureJSON(http.StatusOK, &gin.H{
		"status":  http.StatusOK,
		"message": "Install",
		"data":    data,
	})
}
