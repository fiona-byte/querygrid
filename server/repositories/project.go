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
	"go.mongodb.org/mongo-driver/mongo/options"
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
	ctx := context.Background()
	projectName := utils.ReplaceRegex(strings.TrimSpace(newProject.Name), " ", `\s+`)
	projectDescription := utils.ReplaceRegex(strings.TrimSpace(newProject.Description), " ", `\s+`)
	underscoreName := strings.ReplaceAll(strings.ToLower(projectName), " ", "_")

	var role models.Role
	opts := options.FindOne().SetProjection(bson.D{{"_id", 1}})
	if roleErr := r.connect.Role.FindOne(ctx, bson.D{{"name", "admin"}}, opts).Decode(&role); roleErr != nil {
		logger.Error("Error getting role", roleErr)
		return nil, resterror.InternalServerError()
	}

	project, projectErr := r.connect.Project.InsertOne(ctx, &models.Project{
		Name:        projectName,
		Database:    underscoreName,
		SecretKey:   utils.GenerateRandomToken(35),
		ApiKey:      utils.GenerateRandomToken(23),
		Status:      constants.ACTIVE,
		Description: projectDescription,
		Mode:        constants.Test,
		Members: []*models.ProjectMember{
			{
				UserID: &userID,
				RoleID: &role.ID,
			},
		},
		CreatedAt: utils.CurrentTime(),
		UpdatedAt: utils.CurrentTime(),
	})
	if projectErr != nil {
		if strings.Contains(projectErr.Error(), "name_1") {
			validateErrors := make(map[string]string)
			validateErrors["name"] = "project name already exists"
			return nil, resterror.BadRequest("create project", validateErrors)
		}

		logger.Error("Error creating project", projectErr)
		return nil, resterror.InternalServerError()
	}

	return &models.Project{
		ID: project.InsertedID.(primitive.ObjectID),
	}, nil
}

func (r *ProjectRepo) GetAll(userID primitive.ObjectID, offsetStr, search string) ([]models.Project, *resterror.RestError) {
	ctx := context.Background()

	offset, err := utils.Offset(offsetStr)
	if err != nil {
		restErr := resterror.BadJSONRequest()
		return nil, restErr
	}

	filter := bson.D{{"members.user_id", userID}}
	if search != "" {
		filter = bson.D{
			{"members.user_id", userID},
			{"$text", bson.D{{"$search", search}}},
		}
	}
	opts := options.Find().
		SetProjection(bson.D{{"_id", 1}, {"name", 1}, {"status", 1}}).
		SetSkip(int64(offset)).
		SetLimit(int64(10)).
		SetSort(bson.M{"created_at": -1})
	cursor, cursorErr := r.connect.Project.Find(ctx, filter, opts)
	if cursorErr != nil {
		logger.Error("Error getting projects (cursor)", cursorErr)
		return nil, resterror.InternalServerError()
	}

	var projects []models.Project
	for cursor.Next(ctx) {
		if err := cursor.All(ctx, &projects); err != nil {
			logger.Error("Error getting user projects", err)
			return nil, resterror.InternalServerError()
		}
	}

	if err := cursor.Err(); err != nil {
		logger.Error("Error getting user projects (cursor error)", err)
		return nil, resterror.InternalServerError()
	}

	defer cursor.Close(ctx)

	return projects, nil
}

func (r *ProjectRepo) ProjectCount(userID primitive.ObjectID) (int64, *resterror.RestError) {
	ctx := context.Background()

	filter := bson.D{{"members.user_id", userID}}
	opts := options.Count().SetHint("_id_")
	count, countErr := r.connect.Project.CountDocuments(ctx, filter, opts)
	if countErr != nil {
		logger.Error("Error getting projects (cursor)", countErr)
		return 0, resterror.InternalServerError()
	}

	return count, nil
}
