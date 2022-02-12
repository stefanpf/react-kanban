const express = require("express");
const profileRouter = express.Router();
const db = require("../utils/db");
const { checkValidEmail } = require("../utils/helper-functions");
const { io } = require("../server");

profileRouter
    .route("/api/profile")
    .get((req, res) => {
        const { userId } = req.session;
        db.getUserDataById(userId)
            .then(({ rows }) => {
                res.json({ profileData: rows[0], success: true });
            })
            .catch((err) => {
                console.log("Err in getUserDataById:", err);
                res.json({ success: false });
            });
    })
    .post((req, res) => {
        const { userId } = req.session;
        const { name, email } = req.body;
        if (checkValidEmail(email)) {
            db.updateUserData(userId, name, email)
                .then(() => res.json({ success: true }))
                .catch((err) => {
                    console.log("Err in updateUserData:", err);
                    res.json({ success: false });
                });
        } else {
            res.json({ success: false });
        }
    })
    .delete((req, res) => {
        const { userId } = req.session;
        let projectIds = [];
        db.getOwnedProjectIdsByUserId(userId)
            .then(({ rows }) => {
                rows.forEach((row) => projectIds.push(row.id));
                return db.deleteInviteCodesOnAccountDeletion(
                    userId,
                    projectIds
                );
            })
            .then(() => db.deleteTasksOnAccountDeletion(userId, projectIds))
            .then(() => db.deleteAllMembersFromProjects(projectIds))
            .then(() =>
                db.deleteUserFromForeignProjectsOnAccountDeletion(userId)
            )
            .then(() => db.deleteProjectsOnAccountDeletion(userId))
            .then(() => db.deleteUser(userId))
            .then(() => {
                projectIds.forEach((projectId) => {
                    io.to(`project:${projectId}`).emit(
                        "deleteProject",
                        projectId
                    );
                });
                req.session = null;
                res.json({ success: true });
            })
            .catch((err) => {
                console.log("Err in account deletion:", err);
                res.json({ success: false });
            });
    });

module.exports = profileRouter;
