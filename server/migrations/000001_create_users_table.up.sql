BEGIN;

CREATE TYPE status AS ENUM (
    'active',
    'pending',
    'deactivated'
);

CREATE TABLE IF NOT EXISTS users (
    id          varchar primary key,
    first_name  varchar,
    last_name   varchar,
    email       varchar unique not null,
    password    varchar not null,
    status      status  not null,
    created_at  timestamp NOT NULL default now(),
    updated_at  timestamp NOT NULL default now()
);

COMMIT;
