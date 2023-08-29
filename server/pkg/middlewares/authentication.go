package middlewares

import (
	"net/http"

	"github.com/devylab/querygrid/pkg/config"
	"github.com/devylab/querygrid/pkg/constants"
	"github.com/devylab/querygrid/pkg/jwt"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Authentication(config config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		var accessToken, secret string
		var err error
		if accessToken, err = c.Cookie(constants.ACCESS_TOKEN_KEY); err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": constants.InvalidToken})
			return
		}

		if secret, err = c.Cookie(constants.SECRET_KEY); err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": constants.InvalidToken})
			return
		}

		data, verifyErr := jwt.VerifyJWT(accessToken, config.JWTSecret)
		if verifyErr != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": constants.InvalidToken})
			return
		}

		if data.Secret != secret {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": constants.InvalidToken})
			return
		}

		userID, userIDErr := primitive.ObjectIDFromHex(data.User)
		if userIDErr != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": constants.InvalidToken})
			return
		}

		c.Set("userID", userID)
		c.Next()
	}
}
