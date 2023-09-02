package cache

import (
	"context"
	"errors"
	"github.com/allegro/bigcache/v3"
	"github.com/devylab/querygrid/pkg/logger"
	"time"
)

type Cache struct {
	cache *bigcache.BigCache
}

func NewCache() *Cache {
	cache, err := bigcache.New(context.Background(), bigcache.DefaultConfig(10*time.Minute))
	if err != nil {
		logger.Error("unable to initialize cache", err)
		panic("unable to initialize cache")
	}

	return &Cache{
		cache: cache,
	}
}

func (c *Cache) Set(key string, value []byte) error {
	if err := c.cache.Set(key, value); err != nil {
		logger.Error("unable to save cache", err)
		return errors.New("something went wrong")
	}

	return nil
}

func (c *Cache) Get(key string) ([]byte, error) {
	value, err := c.cache.Get(key)
	if err != nil {
		logger.Error("unable to get cache", err)
		return nil, errors.New("something went wrong")
	}

	return value, nil
}

func (c *Cache) Remove(key string) error {
	if err := c.cache.Delete(key); err != nil {
		logger.Error("unable to remove cache", err)
		return errors.New("something went wrong")
	}

	return nil
}
