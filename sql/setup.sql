DROP TABLE IF EXISTS project_invites;
DROP TABLE IF EXISTS project_members;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    owner_id INT REFERENCES users(id) NOT NULL,
    logo TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    description TEXT,
    owner_id INT REFERENCES users(id) NOT NULL,
    project_id INT REFERENCES projects(id) NOT NULL,
    due_date TIMESTAMP,
    status INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE project_members (
    id SERIAL PRIMARY KEY,
    team_id INT REFERENCES projects(id) NOT NULL,
    member_id INT REFERENCES users(id) NOT NULL
);

CREATE TABLE project_invites (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id) NOT NULL,
    sender_id INT REFERENCES users(id) NOT NULL,
    invite_code VARCHAR,
    used BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);