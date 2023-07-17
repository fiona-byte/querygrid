package config

import (
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	AppEnv         string `mapstructure:"APP_ENV"`
	CorsOrigins    string `mapstructure:"CORS_ORIGINS"`
	TrustedProxies string `mapstructure:"TRUSTED_PROXIES"`
	DatabaseUrl    string `mapstructure:"DATABASE_URL"`
	Mode           string `mapstructure:"MODE"`
	Port           string `mapstructure:"PORT"`
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
		log.Fatal("unable to unmarsha config", err)
	}

	return
}
