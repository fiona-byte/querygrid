package constants

func GetPermissions() map[string][]string {
	permissions := make(map[string][]string)
	permissions["project"] = []string{"create", "read", "update", "delete", "view_all"}
	permissions["user"] = []string{"create", "read", "update", "delete", "view_all"}
	permissions["database"] = []string{"create", "read", "update", "delete", "view_all"}

	return permissions
}
