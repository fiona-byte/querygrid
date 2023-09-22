package models

import (
	"github.com/devylab/querygrid/pkg/resterror"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type Collection struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name      string             `bson:"name,unique" json:"name,omitempty"`
	CreatedAt time.Time          `bson:"created_at" json:"created_at,omitempty"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updated_at,omitempty"`
}

type CreateCollection struct {
	Name  string      `json:"name,omitempty"`
	Field interface{} `bson:"field" json:"field,omitempty"`
}

type CollectionRepository interface {
	GetCollections(projectId string, userId primitive.ObjectID) ([]string, *resterror.RestError)
	ValidateCollection(projectId, collection string, userId primitive.ObjectID) *resterror.RestError
	CreateCollection(projectId string, userId primitive.ObjectID, collection CreateCollection) *resterror.RestError
	// DeleteCollection(projectId string, userId primitive.ObjectID, collection CreateCollection) *resterror.RestError
}
