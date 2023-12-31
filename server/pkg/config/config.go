package config

import (
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	AppEnv      string `mapstructure:"APP_ENV"`
	DatabaseUrl string `mapstructure:"DATABASE_URL"`
	Port        string `mapstructure:"PORT"`
	JWTSecret   string `mapstructure:"JWT_SECRET"`
}

func LoadConfig() (config Config) {
	viper.AddConfigPath(".")
	viper.SetConfigName("app")
	viper.SetConfigType("env")

	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		log.Fatal("unable to read config", err)
	}

	if err := viper.Unmarshal(&config); err != nil {
		log.Fatal("unable to unmarshal config", err)
	}

	return
}
