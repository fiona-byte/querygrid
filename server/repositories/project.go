package repositories

import (
	"context"
	"strings"
	"time"

	"github.com/devylab/querygrid/models"
	"github.com/devylab/querygrid/pkg/config"
	"github.com/devylab/querygrid/pkg/constants"
	"github.com/devylab/querygrid/pkg/database"
	"github.com/devylab/querygrid/pkg/logger"
	"github.com/devylab/querygrid/pkg/paginate"
	"github.com/devylab/querygrid/pkg/resterror"
	"github.com/devylab/querygrid/pkg/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
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
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()
	projectName := utils.ReplaceRegex(strings.TrimSpace(newProject.Name), " ", `\s+`)
	projectDescription := utils.ReplaceRegex(strings.TrimSpace(newProject.Description), " ", `\s+`)
	underscoreName := strings.ReplaceAll(strings.ToLower(projectName), " ", "_")

	var role models.Role
	opts := options.FindOne().SetProjection(bson.D{{"_id", 1}})
	if roleErr := r.connect.Role.FindOne(ctx, bson.D{{"name", "super"}}, opts).Decode(&role); roleErr != nil {
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

func (r *ProjectRepo) GetAll(userID primitive.ObjectID, query models.ProjectQuery, paginate *paginate.Paginate) (*models.ProjectResponse, *resterror.RestError) {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	filter := bson.D{{"members.user_id", userID}}
	if query.Search != "" {
		filter = append(filter, bson.E{"$text", bson.D{{"$search", query.Search}}})
	}

	countOpts := options.Count().SetHint("_id_")
	projectCount, projectCountErr := r.connect.Project.CountDocuments(ctx, filter, countOpts)
	if projectCountErr != nil {
		logger.Error("Error getting projects count", projectCountErr)
		return nil, resterror.InternalServerError()
	}

	opts := options.Find().
		SetProjection(bson.D{{"_id", 1}, {"name", 1}, {"status", 1}}).
		SetLimit(int64(paginate.Limit)).
		SetSkip(int64(paginate.Offset)).
		SetSort(bson.M{"_id": -1})
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

	return &models.ProjectResponse{
		Projects:    projects,
		CurrentPage: paginate.CurrentPage,
		TotalPages:  paginate.TotalPages(projectCount),
		Count:       projectCount,
	}, nil
}

func (r *ProjectRepo) GetById(projectID string, userID primitive.ObjectID, selectOptions bson.D, filterOptions bson.E) (*models.Project, *resterror.RestError) {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	projectId, projectIDErr := primitive.ObjectIDFromHex(projectID)
	if projectIDErr != nil {
		return nil, resterror.InternalServerError()
	}

	var project models.Project

	selectFields := bson.D{{"members", 0}, {"database", 0}, {"updated_at", 0}, {"secret_key", 0}, {"api_key", 0}}
	if selectOptions != nil {
		selectFields = selectOptions
	}

	filter := bson.D{{"_id", projectId}, {"members.user_id", userID}}
	if filterOptions.Key != "" {
		filter = append(filter, filterOptions)
	} else {
		filter = append(filter, bson.E{"members.user_id", userID})
	}

	opts := options.FindOne().SetProjection(selectFields)
	if err := r.connect.Project.FindOne(ctx, filter, opts).Decode(&project); err != nil {
		logger.Error("Error getting project data", err)
		return nil, resterror.BadRequest("project", "not found")
	}

	return &project, nil
}
