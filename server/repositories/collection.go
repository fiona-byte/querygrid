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
	"slices"
	"time"
)

type CollectionRepo struct {
	connect *database.Database
	config  config.Config
}

func NewCollectionRepo(db *database.Database, config config.Config) *CollectionRepo {
	return &CollectionRepo{
		connect: db,
		config:  config,
	}
}

func (r *CollectionRepo) GetCollections(projectId string, userId primitive.ObjectID) ([]string, *resterror.RestError) {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	projectRepo := NewProjectRepo(r.connect, r.config)
	project, projectErr := projectRepo.GetById(projectId, userId, bson.D{{"_id", 1}, {"database", 1}}, bson.E{})
	if projectErr != nil {
		return nil, projectErr
	}

	db := r.connect.GetDatabase(project.Database)
	result, err := db.ListCollectionNames(ctx, bson.D{})
	if err != nil {
		logger.Error("Error getting collections", err)
		return nil, resterror.InternalServerError()
	}

	return result, nil
}

func (r *CollectionRepo) ValidateCollection(projectID, collection string, userId primitive.ObjectID) *resterror.RestError {
	collections, collectionsErr := r.GetCollections(projectID, userId)
	if collectionsErr != nil {
		return collectionsErr
	}

	if slices.Contains(collections, collection) {
		validateErrors := make(map[string]string)
		validateErrors["name"] = "collection name exists"
		return resterror.BadRequest("collection", validateErrors)
	}

	return nil
}

func (r *CollectionRepo) CreateCollection(projectId string, userId primitive.ObjectID, collection models.CreateCollection) *resterror.RestError {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	projectRepo := NewProjectRepo(r.connect, r.config)
	project, projectErr := projectRepo.GetById(projectId, userId, bson.D{{"_id", 1}, {"database", 1}}, bson.E{})
	if projectErr != nil {
		return projectErr
	}

	col := r.connect.GetCollection(project.Database, collection.Name)
	if _, createCollectionErr := col.InsertOne(ctx, collection.Field); createCollectionErr != nil {
		logger.Error("Error creating collection", createCollectionErr)
		return resterror.InternalServerError()
	}

	return nil
}
