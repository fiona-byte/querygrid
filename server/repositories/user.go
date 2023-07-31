package repositories

import (
	"context"
	"strings"
	"time"

	"github.com/devylab/querygrid/models"
	"github.com/devylab/querygrid/pkg/config"
	"github.com/devylab/querygrid/pkg/constants"
	"github.com/devylab/querygrid/pkg/database"
	"github.com/devylab/querygrid/pkg/jwt"
	"github.com/devylab/querygrid/pkg/logger"
	"github.com/devylab/querygrid/pkg/password"
	"github.com/devylab/querygrid/pkg/resterror"
	"github.com/devylab/querygrid/pkg/utils"
	"github.com/google/uuid"
)

type UserRepo struct {
	connect *database.Database
	config  config.Config
}

func NewUserRepo(db *database.Database, config config.Config) *UserRepo {
	return &UserRepo{
		connect: db,
		config:  config,
	}
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

		logger.Error("Error creating user", err)
		return resterror.InternalServerError()
	}

	// TODO: setup mail and send out mail

	return nil
}

func (r *UserRepo) Login(login models.LoginUser) (*models.LoginResp, *resterror.RestError) {
	ctx := context.Background()
	var user models.User
	err := r.connect.DB.NewSelect().Model(&user).Column("id", "password", "status").Where("email = ?", login.Email).Scan(ctx)
	if err != nil {
		logger.Error("Error getting login user data", err)
		return nil, resterror.BadRequest("login", "invalid email/password")
	}

	validPassword, passwordErr := password.Compare(login.Password, user.Password)
	if passwordErr != nil || !validPassword {
		return nil, resterror.BadRequest("login", "invalid email/password")
	}

	if user.Status != constants.ACTIVE {
		return nil, resterror.BadRequest("login", "contact admin for support")
	}

	expirationTime := time.Now().Add(5 * time.Minute)
	secret := utils.GenerateRandomToken(25)
	accessToken, accessTokenErr := jwt.GenerateJWT(user.ID, secret, r.config.JWTSecret, expirationTime)
	if accessTokenErr != nil {
		return nil, accessTokenErr
	}

	expirationTime2 := time.Now().Add(100 * time.Minute)
	refreshToken, refreshTokenErr := jwt.GenerateJWT(user.ID, secret, r.config.JWTSecret, expirationTime2)
	if refreshTokenErr != nil {
		return nil, refreshTokenErr
	}

	return &models.LoginResp{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		Secret:       secret,
	}, nil
}
