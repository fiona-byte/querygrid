package models

import (
	"time"

	"github.com/devylab/querygrid/pkg/resterror"
	"github.com/uptrace/bun"
)

type User struct {
	bun.BaseModel `bun:"table:users,alias:u"`

	ID        string    `bun:"id,pk" json:"id,omitempty"`
	FirstName string    `bun:"first_name" json:"first_name,omitempty"`
	LastName  string    `bun:"last_name" json:"last_name,omitempty"`
	Email     string    `bun:"email,unique,notnull" json:"email,omitempty"`
	Password  string    `bun:"password" json:"-"`
	Status    string    `bun:"status,notnull" json:"status,omitempty"`
	CreatedAt time.Time `bun:"created_at,notnull" json:"created_at,omitempty"`
	UpdatedAt time.Time `bun:"updated_at,notnull" json:"updated_at,omitempty"`
}

type NewUser struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
}

type UserRepository interface {
	FindByID(ID int) (*User, error)
	Create(user NewUser) *resterror.RestError
}
