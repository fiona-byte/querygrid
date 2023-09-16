package models

import (
	"github.com/devylab/querygrid/pkg/resterror"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DocumentID struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
}

type DocumentRepository interface {
	GetDocuments(projectId, collection string, userId primitive.ObjectID) ([]string, *resterror.RestError)
	GetDocument(projectId, collection, document string, userId primitive.ObjectID) (interface{}, *resterror.RestError)
}
