package models

import (
	"github.com/devylab/querygrid/pkg/resterror"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DocumentID struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
}

type CreateDocument struct {
	Name  string      `json:"name,omitempty"`
	Field interface{} `bson:"field" json:"field,omitempty"`
}

type DocumentRepository interface {
	GetDocuments(projectId, collection string, userId primitive.ObjectID) ([]string, *resterror.RestError)
	GetDocument(projectId, collection, document string, userId primitive.ObjectID) (interface{}, *resterror.RestError)
	CreateDocument(projectId string, userId primitive.ObjectID, document CreateDocument) *resterror.RestError
}
