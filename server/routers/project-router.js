const express = require("express");
const cryptoRandomString = require("crypto-random-string");
const projectRouter = express.Router();
const db = require("../utils/db");

projectRouter.get("/api/projects", (req, res) => {
    const { userId } = req.session;
    db.getProjectsByUserId(userId)
        .then(({ rows }) => {
            const projects = rows.map((row) => {
                return {
                    projectId: row.id,
                    ownerId: userId,
                    members: [userId],
                    name: row.name,
                    description: row.description,
                    logo: row.logo,
                };
            });
            res.json({ projects, success: true });
        })
        .catch((err) => {
            console.log("Err in getProjectsByUserId:", err);
            res.json({ success: false });
        });
});

projectRouter.post("/api/project/new", (req, res) => {
    const { userId } = req.session;
    const { name, description, logo } = req.body;
    if (name != "") {
        db.addNewProject(userId, name, description, logo)
            .then(({ rows }) => {
                const newProject = {
                    projectId: rows[0].id,
                    ownerId: userId,
                    members: [userId],
                    name,
                    description,
                    logo,
                };
                res.json({ project: newProject, success: true });
            })
            .catch((err) => {
                console.log("Err in addNewProject:", err);
                res.json({ success: false });
            });
    }
});

projectRouter.post("/api/project/join", (req, res) => {
    const { userId } = req.session;
    const { code } = req.body;
    let projectId;
    db.getProjectFromActiveCode(code)
        .then(({ rows }) => {
            projectId = rows[0].project_id;
            return db.addMemberToProject(userId, projectId);
        })
        .then(() => {
            return db.expireInviteCode(code);
        })
        .then(() => {
            res.json({ projectId, success: true });
        })
        .catch((err) => {
            console.log("Err in joinProject:", err);
            res.json({ success: false });
        });
});

projectRouter.get("/api/project/:id/members", (req, res) => {
    const projectId = req.params.id;
    db.getUserNamesByProjectId(projectId)
        .then(({ rows }) => {
            res.json({ memberNames: rows, success: true });
        })
        .catch((err) => {
            console.log("Err in getUserNamesByProjectId:", err);
            res.json({ success: false });
        });
});

projectRouter
    .route("/api/project/:id/invites")
    .get((req, res) => {
        const projectId = req.params.id;
        db.getActiveProjectInviteCodes(projectId).then(({ rows }) => {
            const codes = rows.map((row) => {
                const createdAt = new Date(row.created_at);
                const expiresOn = new Date(
                    createdAt.setDate(createdAt.getDate() + 7)
                );
                return { code: row.invite_code, expiresOn };
            });
            res.json({ codes, success: true });
        });
    })
    .post((req, res) => {
        const projectId = req.params.id;
        const { userId } = req.session;
        const inviteCode = cryptoRandomString({
            length: 6,
            type: "distinguishable",
        });
        db.addInviteCode(projectId, userId, inviteCode)
            .then(({ rows }) => {
                const createdAt = new Date(rows[0].created_at);
                const expiresOn = new Date(
                    createdAt.setDate(createdAt.getDate() + 7)
                );
                res.json({
                    code: { code: inviteCode, expiresOn },
                    success: true,
                });
            })
            .catch((err) => {
                console.log("Err in addInviteCode:", err);
                res.json({ success: false });
            });
    });

projectRouter.delete("/api/project/:id", (req, res) => {
    const { userId } = req.session;
    const { ownerId } = req.body;
    const projectId = req.params.id;
    if (userId === ownerId) {
        db.deleteTasksByProjectId(projectId)
            .then(() => db.deleteProject(projectId))
            .then(() => res.json({ success: true }))
            .catch((err) => {
                console.log("Err in deleteProject:", err);
                res.json({ success: false });
            });
    } else {
        res.json({ success: false });
    }
});

module.exports = projectRouter;
