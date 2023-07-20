CREATE TABLE IF NOT EXISTS roles (
     id             varchar primary key,
     name           varchar unique not null,
     permissions    jsonb not null default '{}',
     created_at     timestamp NOT NULL default now(),
     updated_at     timestamp NOT NULL default now()
);