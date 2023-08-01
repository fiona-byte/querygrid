package models

import (
	"time"

	"github.com/devylab/querygrid/pkg/resterror"
	"github.com/uptrace/bun"
)

type User struct {
	bun.BaseModel `bun:"table:users,alias:usr"`

	ID        string    `bun:"id,pk" json:"id,omitempty"`
	FirstName string    `bun:"first_name" json:"first_name,omitempty"`
	LastName  string    `bun:"last_name" json:"last_name,omitempty"`
	Email     string    `bun:"email,unique,notnull" json:"email,omitempty"`
	Password  string    `bun:"password" json:"-"`
	Status    string    `bun:"status,notnull" json:"status,omitempty"`
	RoleID    string    `bun:"role_id,notnull" json:"role_id,omitempty"`
	Role      Role      `bun:"rel:belongs-to,join:role_id=id"`
	CreatedAt time.Time `bun:"created_at,notnull" json:"created_at,omitempty"`
	UpdatedAt time.Time `bun:"updated_at,notnull" json:"updated_at,omitempty"`
}

type NewUser struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
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
	Create(user NewUser) *resterror.RestError
	Login(user LoginUser) (*LoginResp, *resterror.RestError)
	CurrentUser(userID string) (User, *resterror.RestError)
}
