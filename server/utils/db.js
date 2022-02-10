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

function getUserDataById(id) {
    const q = `SELECT name, email
            FROM users
            WHERE id = $1;`;
    const params = [id];
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

function getProjectOwnerName(projectId) {
    const q = `SELECT u.name
            FROM users AS u
            JOIN projects AS p
            ON u.id = p.owner_id
            WHERE p.id = $1;`;
    const params = [projectId];
    return db.query(q, params);
}

function getUserNameByTaskId(id) {
    const q = `SELECT u.name
            FROM users AS u
            JOIN tasks AS t
            ON u.id = t.owner_id
            WHERE t.id = $1;`;
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

function getTaskOwnerByTaskId(id) {
    const q = `SELECT owner_id
            FROM tasks
            WHERE id = $1;`;
    const params = [id];
    return db.query(q, params);
}

function getTasksByOwnerId(userId) {
    const q = `SELECT t.id, t.owner_id, t.project_id, t.title, t.description, t.due_date, t.status, u.name
            FROM tasks AS t
            JOIN users AS u
            ON t.owner_id = u.id
            WHERE t.owner_id = $1;`;
    const params = [userId];
    return db.query(q, params);
}

function getNonOwnedTasksByProjectId(userId, arrOfProjectIds) {
    const q = `SELECT t.id, t.owner_id, t.project_id, t.title, t.description, t.due_date, t.status, u.name
            FROM tasks AS t
            JOIN users AS u
            ON t.owner_id = u.id
            WHERE owner_id != $1
            AND project_id = ANY($2);`;
    const params = [userId, arrOfProjectIds];
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

function archiveTask(taskId) {
    const q = `UPDATE tasks
            SET status = 4, archived_on = CURRENT_DATE
            WHERE id = $1;`;
    const params = [taskId];
    return db.query(q, params);
}

function addNewProject(userId, name, description, logo) {
    const q = `INSERT INTO projects (owner_id, name, description, logo)
            VALUES ($1, $2, $3, $4)
            RETURNING id;`;
    const params = [userId, name, description || null, logo || null];
    return db.query(q, params);
}

function updateProject(projectId, ownerId, name, description, logo) {
    const q = `UPDATE projects
            SET owner_id = $2, name = $3, description = $4, logo = $5
            WHERE id = $1;`;
    const params = [projectId, ownerId, name, description, logo];
    return db.query(q, params);
}

function getProjectById(projectId) {
    const q = `SELECT name, description, logo, owner_id
            FROM projects
            WHERE id = $1;`;
    const params = [projectId];
    return db.query(q, params);
}

function getProjectIdsByUserId(userId) {
    const q = `SELECT id
            FROM projects
            WHERE owner_id = $1
            OR id IN (SELECT project_id
                        FROM project_members
                        WHERE member_id = $1);`;
    const params = [userId];
    return db.query(q, params);
}

function getProjectsByUserId(userId) {
    const q = `SELECT p.id, p.name, p.description, p.logo, p.owner_id, u.name AS owner_name
            FROM projects AS p
            JOIN users AS u
            ON u.id = p.owner_id
            WHERE p.owner_id = $1
            OR p.id IN (SELECT project_id
                    FROM project_members
                    WHERE member_id = $1);`;
    const params = [userId];
    return db.query(q, params);
}

function getProjectOwnerByProjectId(id) {
    const q = `SELECT owner_id
            FROM projects
            WHERE id = $1;`;
    const params = [id];
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
            RETURNING expires_on;`;
    const params = [projectId, userId, inviteCode];
    return db.query(q, params);
}

function getProjectFromActiveCode(inviteCode) {
    const q = `SELECT project_id
            FROM project_invites
            WHERE invite_code = $1
            AND used = false
            AND CURRENT_DATE < expires_on;`;
    const params = [inviteCode];
    return db.query(q, params);
}

function getActiveProjectInviteCodes(projectId) {
    const q = `SELECT invite_code, expires_on
            FROM project_invites
            WHERE project_id = $1
            AND used = false;`;
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

function deleteInviteCodeByProjectId(id) {
    const q = `DELETE FROM project_invites
            WHERE project_id = $1;`;
    const params = [id];
    return db.query(q, params);
}

function addMemberToProject(userId, projectId) {
    const q = `INSERT INTO project_members (member_id, project_id)
            VALUES ($1, $2);`;
    const params = [userId, projectId];
    return db.query(q, params);
}

function removeMemberFromProject(userId, projectId) {
    const q = `DELETE FROM project_members
            WHERE member_id = $1
            AND project_id = $2;`;
    const params = [userId, projectId];
    return db.query(q, params);
}

function deleteAllMembersFromProject(projectId) {
    const q = `DELETE FROM project_members
            WHERE project_id = $1;`;
    const params = [projectId];
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
    getUserDataById,
    getUserNamesByProjectId,
    getProjectOwnerName,
    getUserNameByTaskId,
    addNewTask,
    getTaskOwnerByTaskId,
    getTasksByOwnerId,
    getNonOwnedTasksByProjectId,
    updateTask,
    deleteTask,
    archiveTask,
    addNewProject,
    updateProject,
    getProjectById,
    getProjectFromActiveCode,
    getProjectIdsByUserId,
    getProjectsByUserId,
    getProjectOwnerByProjectId,
    getProjectMembersByProjectIds,
    addInviteCode,
    getActiveProjectInviteCodes,
    expireInviteCode,
    deleteInviteCodeByProjectId,
    addMemberToProject,
    removeMemberFromProject,
    deleteAllMembersFromProject,
    deleteTasksByProjectId,
    deleteProject,
};
