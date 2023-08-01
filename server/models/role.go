package models

import (
	"time"

	"github.com/uptrace/bun"
)

type Role struct {
	bun.BaseModel `bun:"table:roles,alias:ros"`

	ID          string              `bun:"id,pk" json:"id,omitempty"`
	Name        string              `bun:"name,notnull" json:"name"`
	Permissions map[string][]string `bun:"permissions,notnull" json:"permissions"`
	CreatedAt   time.Time           `bun:"created_at,notnull" json:"created_at,omitempty"`
	UpdatedAt   time.Time           `bun:"updated_at,notnull" json:"updated_at,omitempty"`
}
