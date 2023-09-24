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

type UpdateDocument struct {
	Name     string      `json:"name,omitempty"`
	Document string      `json:"document,omitempty"`
	Field    interface{} `bson:"field" json:"field,omitempty"`
}

type DeleteDocument struct {
	Collection string `json:"collection,omitempty"`
	Document   string `json:"document,omitempty"`
}

type DocumentRepository interface {
	GetDocuments(projectId, collection string, userId primitive.ObjectID) ([]string, *resterror.RestError)
	GetDocument(projectId, collection, document string, userId primitive.ObjectID) (interface{}, *resterror.RestError)
	CreateDocument(projectId string, userId primitive.ObjectID, document CreateDocument) *resterror.RestError
	UpdateDocument(projectId string, userId primitive.ObjectID, document UpdateDocument) *resterror.RestError
	DeleteDocument(projectId string, userId primitive.ObjectID, document DeleteDocument) *resterror.RestError
}
