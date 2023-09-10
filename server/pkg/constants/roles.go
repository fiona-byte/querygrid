package constants

type role struct {
	User     string
	Project  string
	Database string
}

var Role = role{
	User:     "user",
	Project:  "project",
	Database: "database",
}
