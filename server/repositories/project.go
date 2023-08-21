package repositories

import (
	"context"
	"github.com/devylab/querygrid/models"
	"github.com/devylab/querygrid/pkg/config"
	"github.com/devylab/querygrid/pkg/constants"
	"github.com/devylab/querygrid/pkg/database"
	"github.com/devylab/querygrid/pkg/logger"
	"github.com/devylab/querygrid/pkg/resterror"
	"github.com/devylab/querygrid/pkg/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/writeconcern"
	"strings"
)

type ProjectRepo struct {
	connect *database.Database
	config  config.Config
}

func NewProjectRepo(db *database.Database, config config.Config) *ProjectRepo {
	return &ProjectRepo{
		connect: db,
		config:  config,
	}
}

func (r *ProjectRepo) CreateProject(newProject models.NewProject, userID primitive.ObjectID) (*models.Project, *resterror.RestError) {
	ctxs := context.Background()
	wc := writeconcern.Majority()
	txnOptions := options.Transaction().SetWriteConcern(wc)
	session, sessionErr := r.connect.Client.StartSession()
	if sessionErr != nil {
		logger.Error("Error creating project session", sessionErr)
		return nil, resterror.InternalServerError()
	}

	defer session.EndSession(ctxs)

	result, transactionErr := session.WithTransaction(ctxs, func(ctx mongo.SessionContext) (interface{}, error) {
		projectName := utils.ReplaceRegex(strings.TrimSpace(newProject.Name), " ", `\s+`)
		projectDescription := utils.ReplaceRegex(strings.TrimSpace(newProject.Description), " ", `\s+`)
		underscoreName := strings.ReplaceAll(strings.ToLower(projectName), " ", "_")

		var role models.Role
		var err error

		opts := options.FindOne().SetProjection(bson.D{{"_id", 1}})
		if err = r.connect.Role.FindOne(ctx, bson.D{{"name", "admin"}}, opts).Decode(&role); err != nil {
			return nil, err
		}

		project, projectErr := r.connect.Project.InsertOne(ctx, &models.Project{
			Name:        projectName,
			Database:    underscoreName,
			SecretKey:   utils.GenerateRandomToken(35),
			ApiKey:      utils.GenerateRandomToken(23),
			Status:      constants.ACTIVE,
			Description: projectDescription,
			Mode:        constants.Test,
			UserID:      userID,
			CreatedAt:   utils.CurrentTime(),
			UpdatedAt:   utils.CurrentTime(),
		})
		if projectErr != nil {
			return nil, projectErr
		}

		_, err = r.connect.ProjectMember.InsertOne(ctx, &models.ProjectMember{
			ProjectID: project.InsertedID.(primitive.ObjectID),
			UserID:    userID,
			RoleID:    role.ID,
			CreatedAt: utils.CurrentTime(),
			UpdatedAt: utils.CurrentTime(),
		})
		return project.InsertedID.(primitive.ObjectID), err
	}, txnOptions)

	if transactionErr != nil {
		if strings.Contains(transactionErr.Error(), "name_1") {
			validateErrors := make(map[string]string)
			validateErrors["name"] = "project name already exists"
			return nil, resterror.BadRequest("create project", validateErrors)
		}

		logger.Error("Error creating project", transactionErr)
		return nil, resterror.InternalServerError()
	}

	return &models.Project{
		ID: result.(primitive.ObjectID),
	}, nil
}
