package models

import (
	"github.com/devylab/querygrid/pkg/resterror"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type ProjectMember struct {
	UserID *primitive.ObjectID `bson:"user_id,omitempty" json:"user_id,omitempty"`
	RoleID *primitive.ObjectID `bson:"role_id,omitempty" json:"role_id,omitempty"`
}

type Project struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name        string             `bson:"name,unique" json:"name,omitempty"`
	Database    string             `bson:"database,unique" json:"database,omitempty"`
	SecretKey   string             `bson:"secret_key,unique" json:"secret_key,omitempty"`
	ApiKey      string             `bson:"api_key,unique" json:"api_key,omitempty"`
	Status      string             `bson:"status" json:"status,omitempty"`
	Description string             `bson:"description" json:"description,omitempty"`
	Mode        string             `bson:"mode" json:"mode,omitempty"`
	Members     []*ProjectMember   `bson:"members,omitempty" json:"members,omitempty"`
	CreatedAt   time.Time          `bson:"created_at" json:"created_at,omitempty"`
	UpdatedAt   time.Time          `bson:"updated_at" json:"updated_at,omitempty"`
}

type NewProject struct {
	Name        string `json:"name,omitempty"`
	Description string `json:"description,omitempty"`
}

type ProjectRepository interface {
	CreateProject(project NewProject, userID primitive.ObjectID) (*Project, *resterror.RestError)
	GetById(projectId string, userID primitive.ObjectID) (*Project, *resterror.RestError)
	GetAll(userID primitive.ObjectID, offsetStr, search string) ([]Project, *resterror.RestError)
	ProjectCount(userID primitive.ObjectID) (int64, *resterror.RestError)
}
