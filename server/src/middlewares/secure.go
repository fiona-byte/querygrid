package middlewares

import (
	"net/http"

	"github.com/devylab/querygrid/src/common/constants"
	"github.com/devylab/querygrid/src/common/logger"
	"github.com/gin-gonic/gin"
	"github.com/unrolled/secure"
)

func Secure() gin.HandlerFunc {
	secureMiddleware := secure.New(secure.Options{
		AllowedHosts:          []string{""}, // TODO: setup allowed hosts
		AllowedHostsAreRegex:  true,
		HostsProxyHeaders:     []string{"X-Forwarded-Host"},
		SSLRedirect:           false,
		SSLHost:               "", // TODO: server host
		SSLProxyHeaders:       map[string]string{"X-Forwarded-Proto": "https"},
		STSSeconds:            31536000,
		STSIncludeSubdomains:  true,
		STSPreload:            true,
		FrameDeny:             true,
		ContentTypeNosniff:    true,
		BrowserXssFilter:      true,
		ContentSecurityPolicy: "script-src $NONCE",
		IsDevelopment:         constants.IsDevelopment,
	})
	return func(c *gin.Context) {
		err := secureMiddleware.Process(c.Writer, c.Request)

		// If there was an error, do not continue.
		if err != nil {
			logger.Error("error on secure middleware", err.Error())
			c.AbortWithStatusJSON(http.StatusInternalServerError, &gin.H{
				"status":  http.StatusInternalServerError,
				"message": constants.ServerError,
			})
			return
		}

		// Avoid header rewrite if response is a redirection.
		if status := c.Writer.Status(); status > 300 && status < 399 {
			logger.Error("error on secure middleware redirection", err.Error())
			c.AbortWithStatusJSON(http.StatusInternalServerError, &gin.H{
				"status":  http.StatusInternalServerError,
				"message": constants.ServerError,
			})
			return
		}

		c.Next()
	}
}
