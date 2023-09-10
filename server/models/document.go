package models

import (
	"github.com/devylab/querygrid/pkg/resterror"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DocumentRepository interface {
	GetDocuments(projectId, collection string, userId primitive.ObjectID) ([]string, *resterror.RestError)
	GetDocument(projectId, collection, document string, userId primitive.ObjectID) (interface{}, *resterror.RestError)
}
