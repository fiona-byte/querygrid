package utils

import (
	"math/rand"
	"time"

	"github.com/devylab/querygrid/pkg/constants"
)

func GetPort(port string) string {
	if port == "" {
		port = constants.Port
	}

	return ":" + port
}

func GenerateRandomToken(n int) string {
	var letterRunes = []rune("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}

func CurrentTime() time.Time {
	return time.Now().UTC()
}
