package middlewares

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/devylab/querygrid/pkg/database"
	"github.com/gin-gonic/gin"
)

type roles struct {
	Id          string              `bun:"id,notnull" json:"id"`
	Name        string              `bun:"name,notnull" json:"name"`
	Permissions map[string][]string `bun:"permissions,notnull" json:"permissions"`
	CreatedAt   time.Time           `bun:"created_at,notnull" json:"created_at,omitempty"`
	UpdatedAt   time.Time           `bun:"updated_at,notnull" json:"updated_at,omitempty"`
}

type userRole struct {
	Id     string `json:"id"`
	RoleId string `json:"role_id"`
	Roles  roles
}

func HasPermission(connect *database.Database) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.Background()
		userID := c.MustGet("userID").(string)
		var user userRole
		err := connect.DB.NewSelect().Model(&user).Column("id", "role_id").Join("JOIN roles AS r ON r.id = user.role_id").Where("id = ?", userID).Scan(ctx)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "user don't have the permission"})
			return
		}

		fmt.Println("USER HEHEHEHEHEHEHE", user)
		// GET USER ROLE
		// FETCH ROLE
		// CHECK IF USER ROLE HAS THE RIGHT PERMISSION

		// if data.Secret != secret {
		// 	c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": constants.InvalidToken})
		// 	return
		// }

		c.Next()
	}
}
