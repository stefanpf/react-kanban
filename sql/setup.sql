DROP TABLE IF EXISTS tasks_lists_map;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS list_members;
DROP TABLE IF EXISTS lists;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) NOT NULL,
    receiver_id INT REFERENCES users(id) NOT NULL,
    accepted BOOLEAN DEFAULT false
);

CREATE TABLE lists (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    description TEXT,
    owner_id INT REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE list_members (
    id SERIAL PRIMARY KEY,
    list_id INT REFERENCES lists(id) NOT NULL,
    member_id INT REFERENCES users(id) NOT NULL
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    description TEXT,
    owner_id INT REFERENCES users(id) NOT NULL,
    due_date TIMESTAMP,
    status INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks_lists_map (
    id SERIAL PRIMARY KEY,
    task_id INT REFERENCES tasks(id) NOT NULL,
    list_id INT REFERENCES lists(id) NOT NULL
);