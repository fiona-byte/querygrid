package constants

import (
	"time"
)

var (
	Port                            = "50731"
	OneHour                         = 604800
	ThirtyDays        time.Duration = 259200000000000
	ACTIVE                          = "active"
	PENDING                         = "pending"
	DEACTIVATED                     = "deactivated"
	ACCESS_TOKEN_KEY                = "hryt"
	REFRESH_TOKEN_KEY               = "urqt"
	SECRET_KEY                      = "bhsq"
	DATABASE                        = "querygrid"
	Live                            = "live"
	Test                            = "test"
	CREATE                          = "create"
	VIEW_ALL                        = "view_all"
	READ                            = "read"
	UPDATE                          = "update"
	DELETE                          = "delete"
	ServerError                     = "something went wrong"
	InvalidToken                    = "invalid token"
	PROJECT                         = "project"
	USER                            = "user"
)
