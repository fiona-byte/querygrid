package middlewares

import (
	cache2 "github.com/devylab/querygrid/pkg/cache"
	"github.com/devylab/querygrid/pkg/config"
	"github.com/devylab/querygrid/pkg/constants"
	"github.com/devylab/querygrid/pkg/database"
	"github.com/devylab/querygrid/repositories"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"slices"
)

type Permission struct {
	connect *database.Database
	config  config.Config
	cache   *cache2.Cache
}

func NewPermission(db *database.Database, config config.Config, cache *cache2.Cache) *Permission {
	return &Permission{
		connect: db,
		config:  config,
	}
}

func (r *Permission) HasPermission(field, permission string) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.MustGet("userID").(primitive.ObjectID)
		userRepo := repositories.NewUserRepo(r.connect, r.config, r.cache)

		user, userErr := userRepo.CurrentUser(userID)
		if userErr != nil {
			c.AbortWithStatusJSON(userErr.Status, userErr)
			return
		}

		if user.Status != constants.ACTIVE {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "contact admin for support"})
			return
		}

		permissions := user.Role.Permissions[field]
		if hasRole := slices.Contains(permissions, permission); !hasRole {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "don't have necessary permission"})
			return
		}

		c.Next()
	}
}
