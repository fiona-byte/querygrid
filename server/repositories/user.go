package repositories

import (
	"github.com/devylab/querygrid/models"
	"github.com/devylab/querygrid/pkg/database"
)

type UserRepo struct {
	db *database.Database
}

func NewUserRepo(db *database.Database) *UserRepo {
	return &UserRepo{
		db: db,
	}
}

func (r *UserRepo) FindByID(ID int) (*models.User, error) {
	return &models.User{}, nil
}

func (r *UserRepo) Create(user *models.User) error {
	return nil
}
