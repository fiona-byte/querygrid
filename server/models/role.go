package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Role struct {
	ID          primitive.ObjectID  `bson:"_id,omitempty" json:"id,omitempty"`
	Name        string              `bson:"name" json:"name"`
	Permissions map[string][]string `bson:"permissions" json:"permissions"`
	CreatedAt   time.Time           `bson:"created_at" json:"created_at,omitempty"`
	UpdatedAt   time.Time           `bson:"updated_at" json:"updated_at,omitempty"`
}
