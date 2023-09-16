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

func (r *CollectionRepo) GetCollections(projectID string, userId primitive.ObjectID) ([]string, *resterror.RestError) {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	projectId, projectIDErr := primitive.ObjectIDFromHex(projectID)
	if projectIDErr != nil {
		return nil, resterror.InternalServerError()
	}

	var project models.Project
	opts := options.FindOne().SetProjection(bson.D{{"_id", 1}, {"database", 1}})
	filter := bson.D{{"_id", projectId}, {"members.user_id", userId}}
	if err := r.connect.Project.FindOne(ctx, filter, opts).Decode(&project); err != nil {
		logger.Error("Error getting project data", err)
		return nil, resterror.BadRequest("project", "not found")
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

func (r *CollectionRepo) CreateCollection(projectID string, userId primitive.ObjectID, collection models.CreateCollection) *resterror.RestError {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	projectId, projectIDErr := primitive.ObjectIDFromHex(projectID)
	if projectIDErr != nil {
		return resterror.InternalServerError()
	}

	var project models.Project
	opts := options.FindOne().SetProjection(bson.D{{"_id", 1}, {"database", 1}})
	filter := bson.D{{"_id", projectId}, {"members.user_id", userId}}
	if err := r.connect.Project.FindOne(ctx, filter, opts).Decode(&project); err != nil {
		logger.Error("Error getting project data", err)
		return resterror.BadRequest("project", "not found")
	}

	col := r.connect.GetCollection(project.Database, collection.Name)
	if _, createCollectionErr := col.InsertOne(ctx, collection.Field); createCollectionErr != nil {
		logger.Error("Error creating collection", createCollectionErr)
		return resterror.InternalServerError()
	}

	return nil
}
