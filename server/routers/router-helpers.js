const db = require("../utils/db");

const checkIfUserIsMemberOfProject = (userId, projectId) => {
    return new Promise((resolve, reject) => {
        userId = parseInt(userId);
        projectId = parseInt(projectId);
        let memberIds = [];
        db.getProjectOwnerByProjectId(projectId)
            .then(({ rows }) => {
                memberIds.push(rows[0].owner_id);
                return db.getProjectMembersByProjectIds([projectId]);
            })
            .then(({ rows }) => {
                rows.forEach((row) => {
                    memberIds.push(row.member_id);
                });
                if (memberIds.includes(userId)) {
                    resolve();
                } else {
                    reject(
                        `Membership check failed for user ${userId}. Project members: ${memberIds}`
                    );
                }
            });
    });
};

const checkIfUserIsProjectOwner = (userId, projectId) => {
    return new Promise((resolve, reject) => {
        userId = parseInt(userId);
        projectId = parseInt(projectId);
        db.getProjectOwnerByProjectId(projectId).then(({ rows }) => {
            if (userId === rows[0].owner_id) {
                resolve();
            } else {
                reject(`Ownership check failed for project ${projectId}`);
            }
        });
    });
};

const checkIfUserIsTaskOwner = (userId, taskId) => {
    return new Promise((resolve, reject) => {
        userId = parseInt(userId);
        taskId = parseInt(taskId);
        db.getTaskOwnerByTaskId(taskId).then(({ rows }) => {
            if (userId == rows[0].owner_id) {
                resolve();
            } else {
                reject(`Ownership check failed for task ${taskId}`);
            }
        });
    });
};

module.exports = {
    checkIfUserIsMemberOfProject,
    checkIfUserIsProjectOwner,
    checkIfUserIsTaskOwner,
};
