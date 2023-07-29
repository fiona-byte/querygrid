package constants

import (
	"time"
)

var (
	Port                            = "50731"
	OneHour           time.Duration = 3600000000000
	ThirtyMinutes     time.Duration = 1800000000000
	TwentyMinutes     time.Duration = 1200000000000
	ThirtyDays        time.Duration = 259200000000000
	SixMonths         time.Duration = 15768000000000000
	ACTIVE                          = "active"
	PENDING                         = "pending"
	DEACTIVATED                     = "deactivated"
	ACCESS_TOKEN_KEY                = "hryt"
	REFRESH_TOKEN_KEY               = "urqt"
	SECRET_KEY                      = "bhsq"

	ServerError = "something went wrong"
)
