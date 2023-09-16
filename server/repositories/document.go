package repositories

import (
	"context"
	"github.com/devylab/querygrid/models"
	"github.com/devylab/querygrid/pkg/config"
	"github.com/devylab/querygrid/pkg/database"
	"github.com/devylab/querygrid/pkg/logger"
	"github.com/devylab/querygrid/pkg/resterror"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
)

type DocumentRepo struct {
	connect *database.Database
	config  config.Config
}

func NewDocumentRepo(db *database.Database, config config.Config) *DocumentRepo {
	return &DocumentRepo{
		connect: db,
		config:  config,
	}
}

func (r *DocumentRepo) GetDocuments(projectId, collection string, userId primitive.ObjectID) ([]string, *resterror.RestError) {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	projectRepo := NewProjectRepo(r.connect, r.config)
	project, projectErr := projectRepo.GetById(projectId, userId, bson.D{{"_id", 1}, {"database", 1}})
	if projectErr != nil {
		return nil, projectErr
	}

	col := r.connect.GetCollection(project.Database, collection)
	documentOpts := options.Find().SetProjection(bson.D{{"_id", 1}}).SetSort(bson.M{"_id": -1})
	cursor, cursorErr := col.Find(ctx, bson.D{}, documentOpts)
	if cursorErr != nil {
		logger.Error("Error getting documents (cursor)", cursorErr)
		return nil, resterror.InternalServerError()
	}

	var results []models.DocumentID
	for cursor.Next(ctx) {
		if err := cursor.All(ctx, &results); err != nil {
			logger.Error("Error decoding documents (cursor)", cursorErr)
			return nil, resterror.InternalServerError()
		}
	}

	var documents []string
	for _, result := range results {
		documents = append(documents, result.ID.Hex())
	}

	if err := cursor.Err(); err != nil {
		logger.Error("Error getting collection documents (cursor error)", err)
		return nil, resterror.InternalServerError()
	}

	defer cursor.Close(ctx)

	return documents, nil
}

func (r *DocumentRepo) GetDocument(projectId, collection, document string, userId primitive.ObjectID) (interface{}, *resterror.RestError) {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	documentId, documentIdErr := primitive.ObjectIDFromHex(document)
	if documentIdErr != nil {
		return nil, resterror.InternalServerError()
	}

	projectRepo := NewProjectRepo(r.connect, r.config)
	project, projectErr := projectRepo.GetById(projectId, userId, bson.D{{"_id", 1}, {"database", 1}})
	if projectErr != nil {
		return nil, projectErr
	}

	var result bson.M
	col := r.connect.GetCollection(project.Database, collection)
	documentOpts := options.FindOne().SetProjection(bson.D{{"_id", 0}})
	if err := col.FindOne(ctx, bson.D{{"_id", documentId}}, documentOpts).Decode(&result); err != nil {
		logger.Error("Error getting document", err)
		return nil, resterror.InternalServerError()
	}

	return result, nil
}

func (r *DocumentRepo) CreateDocument(projectId string, userId primitive.ObjectID, document models.CreateDocument) *resterror.RestError {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	projectRepo := NewProjectRepo(r.connect, r.config)
	project, projectErr := projectRepo.GetById(projectId, userId, bson.D{{"_id", 1}, {"database", 1}})
	if projectErr != nil {
		return projectErr
	}

	col := r.connect.GetCollection(project.Database, document.Name)
	if _, createDocumentErr := col.InsertOne(ctx, document.Field); createDocumentErr != nil {
		logger.Error("Error creating document", createDocumentErr)
		return resterror.InternalServerError()
	}

	return nil
}

func (r *DocumentRepo) UpdateDocument(projectId string, userId primitive.ObjectID, document models.UpdateDocument) *resterror.RestError {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	documentId, documentIdErr := primitive.ObjectIDFromHex(document.Document)
	if documentIdErr != nil {
		return resterror.InternalServerError()
	}

	projectRepo := NewProjectRepo(r.connect, r.config)
	project, projectErr := projectRepo.GetById(projectId, userId, bson.D{{"_id", 1}, {"database", 1}})
	if projectErr != nil {
		return projectErr
	}

	col := r.connect.GetCollection(project.Database, document.Name)
	if _, updateDocumentErr := col.ReplaceOne(ctx, bson.D{{"_id", documentId}}, document.Field); updateDocumentErr != nil {
		logger.Error("Error updating document", updateDocumentErr)
		return resterror.InternalServerError()
	}

	return nil
}
