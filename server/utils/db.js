let DATABASE, DB_USERNAME, DB_PASSWORD;
if (!(process.env.NODE_ENV == "production")) {
    DATABASE = require("../../secrets").DATABASE;
    DB_USERNAME = require("../../secrets").DB_USERNAME;
    DB_PASSWORD = require("../../secrets").DB_PASSWORD;
}

const psql = require("spiced-pg");

const db = psql(
    process.env.DATABASE_URL ||
        `postgres:${DB_USERNAME}:${DB_PASSWORD}@localhost:5432/${DATABASE}`
);

console.log(`[db] connecting to: ${DATABASE}`);

function addUser(name, email, hashedPw) {
    const q = `INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3) RETURNING id`;
    const params = [name, email, hashedPw];
    return db.query(q, params);
}

function getUserByEmail(email) {
    const q = `SELECT id, password FROM users WHERE email = $1;`;
    const params = [email];
    return db.query(q, params);
}

function addNewTask(userId, project_id, title, description, dueDate) {
    const q = `INSERT INTO tasks (owner_id, project_id, title, description, due_date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id;`;
    const params = [userId, project_id, title, description, dueDate];
    return db.query(q, params);
}

function getTasksByOwnerId(userId) {
    const q = `SELECT id, owner_id, project_id, title, description, due_date, status
            FROM tasks
            WHERE owner_id = $1;`;
    const params = [userId];
    return db.query(q, params);
}

function updateTask(
    taskId,
    ownerId,
    projectId,
    title,
    description,
    dueDate,
    status
) {
    const q = `UPDATE tasks
            SET owner_id = $2, project_id = $3, title = $4, description = $5, due_date = $6, status = $7
            WHERE id = $1;`;
    const params = [
        taskId,
        ownerId,
        projectId,
        title,
        description,
        dueDate,
        status,
    ];
    return db.query(q, params);
}

function deleteTask(taskId, userId) {
    const q = `DELETE FROM tasks
            WHERE id = $1
            AND owner_id = $2;`;
    const params = [taskId, userId];
    return db.query(q, params);
}

function addNewProject(userId, name, description, logo) {
    const q = `INSERT INTO projects (owner_id, name, description, logo)
            VALUES ($1, $2, $3, $4)
            RETURNING id;`;
    const params = [userId, name, description || null, logo || null];
    return db.query(q, params);
}

function getProjectsByUserId(userId) {
    const q = `SELECT id, name, description, logo
            FROM projects
            WHERE owner_id = $1;`;
    const params = [userId];
    return db.query(q, params);
}

function deleteTasksByProjectId(id) {
    const q = `DELETE FROM tasks
            WHERE project_id = $1;`;
    const params = [id];
    return db.query(q, params);
}

function deleteProject(id) {
    const q = `DELETE FROM projects
            WHERE id = $1;`;
    const params = [id];
    return db.query(q, params);
}

module.exports = {
    addUser,
    getUserByEmail,
    addNewTask,
    getTasksByOwnerId,
    updateTask,
    deleteTask,
    addNewProject,
    getProjectsByUserId,
    deleteTasksByProjectId,
    deleteProject,
};
