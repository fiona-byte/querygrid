package utils

import "github.com/devylab/querygrid/pkg/constants"

func GetPort(port string) string {
	if port == "" {
		port = constants.Port
	}

	return ":" + port
}
