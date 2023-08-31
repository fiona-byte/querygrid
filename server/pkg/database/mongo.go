package database

import (
	"context"
	"errors"
	"github.com/devylab/querygrid/models"
	"strings"
	"time"

	"github.com/devylab/querygrid/pkg/config"
	"github.com/devylab/querygrid/pkg/constants"
	"github.com/devylab/querygrid/pkg/logger"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Database struct {
	Client        *mongo.Client
	User          *mongo.Collection
	Role          *mongo.Collection
	Project       *mongo.Collection
	ProjectMember *mongo.Collection
	Setting       *mongo.Collection
}

func Connect(config config.Config) *Database {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(config.DatabaseUrl))
	if err != nil {
		logger.Error("Error connecting database %v", err)
		panic("unable to connect to database")
	}

	// defer client.Disconnect(ctx)

	userCol, userColErr := userCol(client)
	if userColErr != nil {
		panic(userColErr)
	}

	roleCol, roleColErr := roleCol(client)
	if roleColErr != nil {
		panic(roleColErr)
	}

	projectCol, projectColErr := projectCol(client)
	if projectColErr != nil {
		panic(projectColErr)
	}

	projectMemberCol, projectMemberColErr := projectMemberCol(client)
	if projectMemberColErr != nil {
		panic(projectMemberColErr)
	}

	settingCol, settingColErr := settingCol(client)
	if settingColErr != nil {
		panic(settingColErr)
	}

	return &Database{
		Client:        client,
		User:          userCol,
		Role:          roleCol,
		Project:       projectCol,
		ProjectMember: projectMemberCol,
		Setting:       settingCol,
	}
}

func userCol(client *mongo.Client) (*mongo.Collection, error) {
	database := client.Database(constants.DATABASE)
	col := database.Collection("users")

	indexModel := []mongo.IndexModel{
		{
			Keys:    bson.D{{"email", 1}},
			Options: options.Index().SetUnique(true),
		},
	}
	opts := options.CreateIndexes().SetMaxTime(2 * time.Second)
	if _, err := col.Indexes().CreateMany(context.Background(), indexModel, opts); err != nil {
		logger.Error("Error creating user index", err)
		return nil, errors.New("error setting up user collection")
	}

	return col, nil
}

func roleCol(client *mongo.Client) (*mongo.Collection, error) {
	database := client.Database(constants.DATABASE)
	col := database.Collection("roles")

	indexModel := []mongo.IndexModel{
		{
			Keys:    bson.D{{"name", 1}},
			Options: options.Index().SetUnique(true),
		},
	}
	opts := options.CreateIndexes().SetMaxTime(2 * time.Second)
	if _, err := col.Indexes().CreateMany(context.Background(), indexModel, opts); err != nil {
		logger.Error("Error creating role index", err)
		return nil, errors.New("error setting up role collection")
	}

	return col, nil
}

func projectCol(client *mongo.Client) (*mongo.Collection, error) {
	database := client.Database(constants.DATABASE)
	col := database.Collection("projects")
	indexModel := []mongo.IndexModel{
		{
			Keys:    bson.D{{"name", 1}},
			Options: options.Index().SetUnique(true),
		},
		{
			Keys:    bson.D{{"database", 1}},
			Options: options.Index().SetUnique(true),
		},
		{
			Keys:    bson.D{{"secret_key", 1}},
			Options: options.Index().SetUnique(true),
		},
		{
			Keys:    bson.D{{"api_key", 1}},
			Options: options.Index().SetUnique(true),
		},
		{
			Keys: bson.D{{"name", "text"}},
		},
	}
	opts := options.CreateIndexes().SetMaxTime(2 * time.Second)
	if _, err := col.Indexes().CreateMany(context.Background(), indexModel, opts); err != nil {
		logger.Error("Error creating project index", err)
		return nil, errors.New("error setting up project collection")
	}

	return col, nil
}

func projectMemberCol(client *mongo.Client) (*mongo.Collection, error) {
	database := client.Database(constants.DATABASE)
	col := database.Collection("project_members")

	return col, nil
}

func settingCol(client *mongo.Client) (*mongo.Collection, error) {
	database := client.Database(constants.DATABASE)
	col := database.Collection("settings")

	indexModel := []mongo.IndexModel{
		{
			Keys:    bson.D{{"name", 1}},
			Options: options.Index().SetUnique(true),
		},
	}
	opts := options.CreateIndexes().SetMaxTime(2 * time.Second)
	if _, err := col.Indexes().CreateMany(context.Background(), indexModel, opts); err != nil {
		logger.Error("Error creating settings index", err)
		return nil, errors.New("error setting up settings collection")
	}

	setting := &models.Setting{
		Name:  "install",
		Value: false,
	}

	if _, settingsErr := col.InsertOne(context.Background(), setting); settingsErr != nil {
		if !strings.Contains(settingsErr.Error(), "name_1") {
			logger.Error("Error inserting settings install", settingsErr)
			return nil, errors.New("error inserting settings install")
		}
	}

	return col, nil
}
