package middlewares

import (
	"crypto/md5"
	"fmt"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

func StaticFileCache() gin.HandlerFunc {
	return func(c *gin.Context) {
		if !strings.HasPrefix(c.Request.URL.Path, "/api") {
			data := []byte(time.Now().String())
			etag := fmt.Sprintf("%x", md5.Sum(data))
			c.Header("Cache-Control", "public, max-age=86400")
			c.Header("ETag", etag)
		}
		c.Next()
	}
}
