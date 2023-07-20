package password

import (
	"crypto/subtle"
	"encoding/base64"
	"errors"
	"fmt"
	"math/rand"
	"strings"

	"github.com/devylab/querygrid/pkg/logger"
	"golang.org/x/crypto/argon2"
)

type passwordConfig struct {
	time    uint32
	memory  uint32
	threads uint8
	keyLen  uint32
}

func Hash(password string) (string, error) {
	config := &passwordConfig{
		time:    1,
		memory:  64 * 1024,
		threads: 4,
		keyLen:  32,
	}

	// Generate a Salt
	salt := make([]byte, 16)
	if _, err := rand.Read(salt); err != nil {
		logger.Error("Error hashing password", err.Error())
		return "", errors.New("something went wrong")
	}

	hash := argon2.IDKey([]byte(password), salt, config.time, config.memory, config.threads, config.keyLen)

	// Base64 encode the salt and hashed password.
	b64Salt := base64.RawStdEncoding.EncodeToString(salt)
	b64Hash := base64.RawStdEncoding.EncodeToString(hash)

	format := "$argon2id$v=%d$m=%d,t=%d,p=%d$%s$%s"
	full := fmt.Sprintf(format, argon2.Version, config.memory, config.time, config.threads, b64Salt, b64Hash)
	return full, nil
}

// Compare is used to compare a user-inputted password to a hash to see
// if the password matches or not.
func Compare(password string, hash string) (bool, error) {

	parts := strings.Split(hash, "$")

	c := &passwordConfig{}
	_, err := fmt.Sscanf(parts[3], "m=%d,t=%d,p=%d", &c.memory, &c.time, &c.threads)
	if err != nil {
		logger.Error("Error comparing password", err.Error())
		return false, errors.New("something went wrong")
	}

	salt, decodeErr := base64.RawStdEncoding.DecodeString(parts[4])
	if decodeErr != nil {
		logger.Error("Error comparing password", decodeErr.Error())
		return false, errors.New("something went wrong")
	}

	decodedHash, decodeHashErr := base64.RawStdEncoding.DecodeString(parts[5])
	if decodeHashErr != nil {
		logger.Error("Error comparing password", decodeHashErr.Error())
		return false, errors.New("something went wrong")
	}
	c.keyLen = uint32(len(decodedHash))

	comparisonHash := argon2.IDKey([]byte(password), salt, c.time, c.memory, c.threads, c.keyLen)

	return subtle.ConstantTimeCompare(decodedHash, comparisonHash) == 1, nil
}
