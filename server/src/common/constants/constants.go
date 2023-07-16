package constants

import (
	"time"

	"github.com/devylab/querygrid/src/common/env"
	"github.com/gin-gonic/gin"
)

var (
	Port                        = "50731"
	OneHour       time.Duration = 3600000000000
	ThirtyMinutes time.Duration = 1800000000000
	TwentyMinutes time.Duration = 1200000000000
	ThirtyDays    time.Duration = 259200000000000
	SixMonths     time.Duration = 15768000000000000

	AppEnv         = env.Get("APP_ENV")
	IsDevelopment  = env.Get("APP_ENV") == "development"
	IsProduction   = env.Get("APP_ENV") == "production"
	IsTest         = env.Get("APP_ENV") == "test"
	CorsOrigins    = env.Get("CORS_ORIGINS")
	TrustedProxies = env.Get("TRUSTED_PROXIES")

	ServerError = "something went wrong"
	GinMode     = gin.ReleaseMode
)

func init() {
	if AppEnv == "development" {
		GinMode = gin.DebugMode
	}
}
