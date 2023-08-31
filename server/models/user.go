package models

import (
	"time"

	"github.com/devylab/querygrid/pkg/resterror"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	FirstName string             `bson:"first_name" json:"first_name,omitempty"`
	LastName  string             `bson:"last_name" json:"last_name,omitempty"`
	Email     string             `bson:"email,unique" json:"email,omitempty"`
	Password  string             `bson:"password" json:"-"`
	Status    string             `bson:"status" json:"status,omitempty"`
	RoleID    primitive.ObjectID `bson:"role_id" json:"role_id,omitempty"`
	Role      Role               `bson:"roles" json:"role,omitempty"`
	CreatedAt time.Time          `bson:"created_at" json:"created_at,omitempty"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updated_at,omitempty"`
}

type NewUser struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	RoleID    string `json:"role_id"`
	Password  string `json:"password"`
}

type LoginUser struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResp struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	Secret       string `json:"secret"`
}

type UserRepository interface {
	CreateUser(user NewUser) *resterror.RestError
	Login(user LoginUser) (*LoginResp, *resterror.RestError)
	CurrentUser(userID primitive.ObjectID) (User, *resterror.RestError)
	Setup(user NewUser) (*LoginResp, *resterror.RestError)
}
