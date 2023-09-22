package repositories

import (
	"context"
	"time"

	"github.com/devylab/querygrid/models"
	"github.com/devylab/querygrid/pkg/config"
	"github.com/devylab/querygrid/pkg/database"
	"github.com/devylab/querygrid/pkg/logger"
	"github.com/devylab/querygrid/pkg/resterror"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type RoleRepo struct {
	connect *database.Database
	config  config.Config
}

func NewRoleRepo(db *database.Database, config config.Config) *RoleRepo {
	return &RoleRepo{
		connect: db,
		config:  config,
	}
}

func (r *RoleRepo) GetById(roleId string) (*models.Role, *resterror.RestError) {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	roleID, roleIDErr := primitive.ObjectIDFromHex(roleId)
	if roleIDErr != nil {
		return nil, resterror.InternalServerError()
	}

	var role models.Role
	if roleErr := r.connect.Role.FindOne(ctx, bson.D{{"_id", roleID}}).Decode(&role); roleErr != nil {
		logger.Error("error getting install setting", roleErr)
		return nil, resterror.InternalServerError()
	}

	return &role, nil
}
