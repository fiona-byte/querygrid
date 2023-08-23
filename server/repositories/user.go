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
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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

func (r *UserRepo) CreateUser(newUser models.NewUser) *resterror.RestError {
	hashPassword, hashPasswordErr := password.Hash(utils.GenerateRandomToken(20))
	if hashPasswordErr != nil {
		return resterror.InternalServerError()
	}

	roleID, roleIDErr := primitive.ObjectIDFromHex(newUser.RoleID)
	if roleIDErr != nil {
		return resterror.InternalServerError()
	}

	user := &models.User{
		FirstName: newUser.FirstName,
		LastName:  newUser.LastName,
		Email:     newUser.Email,
		Password:  hashPassword,
		RoleID:    roleID,
		Status:    constants.PENDING,
		CreatedAt: utils.CurrentTime(),
		UpdatedAt: utils.CurrentTime(),
	}

	ctx := context.Background()
	if _, err := r.connect.User.InsertOne(ctx, user); err != nil {
		if strings.Contains(err.Error(), "email_1") {
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
	opts := options.FindOne().SetProjection(bson.D{{"_id", 1}, {"password", 1}, {"status", 1}})
	if err := r.connect.User.FindOne(ctx, bson.D{{"email", login.Email}}, opts).Decode(&user); err != nil {
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
	accessToken, accessTokenErr := jwt.GenerateJWT(user.ID.Hex(), secret, r.config.JWTSecret, expirationTime)
	if accessTokenErr != nil {
		return nil, accessTokenErr
	}

	expirationTime2 := time.Now().Add(100 * time.Minute)
	refreshToken, refreshTokenErr := jwt.GenerateJWT(user.ID.Hex(), secret, r.config.JWTSecret, expirationTime2)
	if refreshTokenErr != nil {
		return nil, refreshTokenErr
	}

	return &models.LoginResp{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		Secret:       secret,
	}, nil
}

func (r *UserRepo) CurrentUser(userID primitive.ObjectID) (models.User, *resterror.RestError) {
	ctx := context.Background()
	matchStage := bson.D{{"$match", bson.D{{"_id", userID}}}}
	lookupStage := bson.D{{"$lookup", bson.D{
		{"from", "roles"},
		{"localField", "role_id"},
		{"foreignField", "_id"},
		{"as", "roles"}},
	}}
	unwindStage := bson.D{{"$unwind", bson.D{{"path", "$roles"}}}}
	cursor, cursorErr := r.connect.User.Aggregate(ctx, mongo.Pipeline{lookupStage, matchStage, unwindStage})
	if cursorErr != nil {
		logger.Error("Error getting user projects (cursor aggregate)", cursorErr)
		return models.User{}, resterror.InternalServerError()
	}

	var user models.User
	for cursor.Next(ctx) {
		if err := cursor.Decode(&user); err != nil {
			logger.Error("Error getting current user", err)
			return user, resterror.InternalServerError()
		}
	}

	if err := cursor.Err(); err != nil {
		logger.Error("Error getting current user (cursor error)", err)
		return user, resterror.InternalServerError()
	}

	defer cursor.Close(ctx)

	return user, nil
}
