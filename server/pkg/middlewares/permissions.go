package middlewares

import (
	"context"
	"fmt"
	"net/http"

	"github.com/devylab/querygrid/models"
	"github.com/devylab/querygrid/pkg/database"
	"github.com/gin-gonic/gin"
	"github.com/uptrace/bun"
)

func HasPermission(connect *database.Database) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.Background()
		userID := c.MustGet("userID").(string)
		var user models.User
		err := connect.DB.NewSelect().Model(&user).
			Column("usr.id", "usr.role_id").
			Relation("Role", func(q *bun.SelectQuery) *bun.SelectQuery {
				return q.Column("id", "name", "permission")
			}).
			Where("id = ?", userID).Scan(ctx)
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
