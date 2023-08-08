package database

import (
	"context"
	"errors"
	"time"

	"github.com/devylab/querygrid/pkg/config"
	"github.com/devylab/querygrid/pkg/constants"
	"github.com/devylab/querygrid/pkg/logger"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Database struct {
	Client *mongo.Client
	User   *mongo.Collection
	Role   *mongo.Collection
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

	return &Database{
		Client: client,
		User:   userCol,
		Role:   roleCol,
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
	_, err := col.Indexes().CreateMany(context.TODO(), indexModel, opts)
	if err != nil {
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
	_, err := col.Indexes().CreateMany(context.TODO(), indexModel, opts)
	if err != nil {
		logger.Error("Error creating role index", err)
		return nil, errors.New("error setting up role collection")
	}

	return col, nil
}
