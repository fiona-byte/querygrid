package models

type User struct {
	Name string
}

type UserRepository interface {
	FindByID(ID int) (*User, error)
	Create(user *User) error
}
