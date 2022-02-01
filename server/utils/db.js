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

function getUserNamesByProjectId(id) {
    const q = `SELECT name
            FROM users
            WHERE id IN (SELECT member_id
                            FROM project_members
                            WHERE project_id = $1)
                OR id = (SELECT owner_id
                            FROM projects
                            WHERE id = $1);`;
    const params = [id];
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
    const q = `SELECT id, name, description, logo, owner_id
            FROM projects
            WHERE owner_id = $1
            OR id IN (SELECT project_id
                    FROM project_members
                    WHERE member_id = $1);`;
    const params = [userId];
    return db.query(q, params);
}

function getProjectMembersByProjectIds(arrOfIds) {
    const q = `SELECT project_id, member_id
            FROM project_members
            WHERE project_id = ANY ($1);`;
    const params = [arrOfIds];
    return db.query(q, params);
}

function addInviteCode(projectId, userId, inviteCode) {
    const q = `INSERT INTO project_invites (project_id, sender_id, invite_code)
            VALUES ($1, $2, $3)
            RETURNING created_at;`;
    const params = [projectId, userId, inviteCode];
    return db.query(q, params);
}

function getProjectFromActiveCode(inviteCode) {
    const q = `SELECT project_id
            FROM project_invites
            WHERE invite_code = $1
            AND used = false
            AND CURRENT_TIMESTAMP - created_at < INTERVAL '7 days';`;
    const params = [inviteCode];
    return db.query(q, params);
}

function getActiveProjectInviteCodes(projectId) {
    const q = `SELECT invite_code, created_at
            FROM project_invites
            WHERE project_id = $1
            AND used = false
            AND CURRENT_TIMESTAMP - created_at < INTERVAL '7 days';`;
    const params = [projectId];
    return db.query(q, params);
}

function deleteTasksByProjectId(id) {
    const q = `DELETE FROM tasks
            WHERE project_id = $1;`;
    const params = [id];
    return db.query(q, params);
}

function expireInviteCode(code) {
    const q = `UPDATE project_invites
            SET used = true
            WHERE invite_code = $1;`;
    const params = [code];
    return db.query(q, params);
}

function addMemberToProject(userId, projectId) {
    const q = `INSERT INTO project_members (member_id, project_id)
            VALUES ($1, $2);`;
    const params = [userId, projectId];
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
    getUserNamesByProjectId,
    addNewTask,
    getTasksByOwnerId,
    updateTask,
    deleteTask,
    addNewProject,
    getProjectFromActiveCode,
    getProjectsByUserId,
    getProjectMembersByProjectIds,
    addInviteCode,
    getActiveProjectInviteCodes,
    expireInviteCode,
    addMemberToProject,
    deleteTasksByProjectId,
    deleteProject,
};
