package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Setting struct {
	ID    primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name  string             `bson:"name" json:"name"`
	Value interface{}        `bson:"value" json:"value"`
}
