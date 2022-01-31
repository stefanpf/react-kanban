const express = require("express");
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

projectRouter.get("/api/project/:id/members", (req, res) => {
    const projectId = req.params.id;
    db.getUserNamesByProjectId(projectId)
        .then(({ rows }) => {
            console.log(rows);
            res.json({ memberNames: rows, success: true });
        })
        .catch((err) => {
            console.log("Err in getUserNamesByProjectId:", err);
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
