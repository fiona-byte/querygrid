package database

import (
	"context"
	"database/sql"

	"github.com/devylab/querygrid/pkg/config"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
	"github.com/uptrace/bun/extra/bundebug"
)

type Database struct {
	DB *bun.DB
}

func Connect(config config.Config) *Database {
	sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(config.DatabaseUrl)))

	db := bun.NewDB(sqldb, pgdialect.New())
	db.AddQueryHook(bundebug.NewQueryHook(
		bundebug.WithVerbose(true),
		bundebug.FromEnv("BUNDEBUG"),
	))

	ctx := context.Background()
	_, err := db.ExecContext(ctx, "SELECT 1")
	if err != nil {
		panic(err.Error())
	}
	return &Database{DB: db}
}
