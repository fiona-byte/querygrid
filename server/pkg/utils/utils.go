package utils

import (
	"math/rand"
	"regexp"
	"strings"
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
	var letterRunes = []rune("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@$%^&*)(!+=")
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}

func CurrentTime() time.Time {
	return time.Now().UTC()
}

func ReplaceRegex(data, value, regex string) string {
	re := regexp.MustCompile(regex)
	return re.ReplaceAllString(data, value)
}

func GetDomain(data string) string {
	originDomain := ReplaceRegex(data, "", `https?:\/\/`)
	return strings.Split(originDomain, ":")[0]
}

func IsProduction(state string) bool {
	return state == "production"
}
