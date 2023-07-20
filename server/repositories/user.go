package repositories

import (
	"context"
	"strings"

	"github.com/devylab/querygrid/models"
	"github.com/devylab/querygrid/pkg/constants"
	"github.com/devylab/querygrid/pkg/database"
	"github.com/devylab/querygrid/pkg/logger"
	"github.com/devylab/querygrid/pkg/password"
	"github.com/devylab/querygrid/pkg/resterror"
	"github.com/devylab/querygrid/pkg/utils"
	"github.com/google/uuid"
)

type UserRepo struct {
	connect *database.Database
}

func NewUserRepo(db *database.Database) *UserRepo {
	return &UserRepo{
		connect: db,
	}
}

func (r *UserRepo) FindByID(ID int) (*models.User, error) {
	return &models.User{}, nil
}

func (r *UserRepo) Create(newUser models.NewUser) *resterror.RestError {
	hashPassword, hashPasswordErr := password.Hash(utils.GenerateRandomToken(20))
	if hashPasswordErr != nil {
		return resterror.InternalServerError()
	}

	user := &models.User{
		ID:        uuid.New().String(),
		FirstName: newUser.FirstName,
		LastName:  newUser.LastName,
		Email:     newUser.Email,
		Password:  hashPassword,
		Status:    constants.PENDING,
		CreatedAt: utils.CurrentTime(),
		UpdatedAt: utils.CurrentTime(),
	}

	ctx := context.Background()
	if _, err := r.connect.DB.NewInsert().Model(user).Exec(ctx); err != nil {
		if strings.Contains(err.Error(), "users_email_key") {
			validateErrors := make(map[string]string)
			validateErrors["email"] = "email already exists"
			return resterror.BadRequest("unique constraint", validateErrors)
		}

		logger.Error("Error creating user", err.Error())
		return resterror.InternalServerError()
	}

	// TODO: setup mail and send out mail

	return nil
}
