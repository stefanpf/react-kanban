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

module.exports = projectRouter;
