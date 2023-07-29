package jwt

import (
	"time"

	"github.com/devylab/querygrid/pkg/logger"
	"github.com/devylab/querygrid/pkg/resterror"
	"github.com/golang-jwt/jwt/v5"
)

type Claims struct {
	User string `json:"user"`
	jwt.RegisteredClaims
}

func GenerateJWT(id string, secret string, expirationTime time.Time) (string, *resterror.RestError) {
	claims := &Claims{
		User: id,
		RegisteredClaims: jwt.RegisteredClaims{
			// In JWT, the expiry time is expressed as unix milliseconds
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	stringToken, err := token.SignedString([]byte(secret))
	if err != nil {
		logger.Error("Error generating jwt", err)
		return "", resterror.InternalServerError()
	}

	return stringToken, nil
}

func VerifyJWT(token string, secret string) (*Claims, *resterror.RestError) {
	claims := &Claims{}

	tkn, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})
	if err != nil {
		logger.Error("Error verifying JWT", err)
		return nil, resterror.InternalServerError()
	}
	if !tkn.Valid {
		logger.Error("Error verifying JWT (tkn.Valid)", tkn.Valid)
		return nil, resterror.BadRequest("login", "invalid token")
	}

	return claims, nil
}
