package middlewares

import (
	"github.com/gin-contrib/secure"
	"github.com/gin-gonic/gin"
)

func Secure(env string) gin.HandlerFunc {
	return secure.New(secure.Config{
		AllowedHosts:          []string{""}, // TODO: setup allowed hosts
		SSLRedirect:           false,
		SSLHost:               "", // TODO: server host
		SSLProxyHeaders:       map[string]string{"X-Forwarded-Proto": "https"},
		STSSeconds:            31536000,
		STSIncludeSubdomains:  true,
		FrameDeny:             true,
		ContentTypeNosniff:    true,
		BrowserXssFilter:      true,
		IENoOpen:              true,
		ContentSecurityPolicy: "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'",
		ReferrerPolicy:        "strict-origin-when-cross-origin",
		IsDevelopment:         env != "production",
	})
}
