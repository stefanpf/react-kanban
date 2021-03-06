const express = require("express");
const cryptoRandomString = require("crypto-random-string");
const projectRouter = express.Router();
const db = require("../utils/db");
const helpers = require("./router-helpers");
const { requireLoggedInUser } = require("../middleware/authorization");
const { io } = require("../server");

projectRouter.use(requireLoggedInUser);

projectRouter.get("/api/projects", (req, res) => {
    const { userId } = req.session;
    let projects;
    db.getProjectsByUserId(userId)
        .then(({ rows }) => {
            projects = rows.map((row) => {
                return {
                    projectId: row.id,
                    ownerId: row.owner_id,
                    ownerName: row.owner_name,
                    members: [row.owner_id],
                    name: row.name,
                    description: row.description,
                    logo: row.logo,
                };
            });
            return projects.map((project) => project.projectId);
        })
        .then((projectIds) => {
            return db.getProjectMembersByProjectIds(projectIds);
        })
        .then(({ rows }) => {
            rows.forEach((row) => {
                const project = projects.filter(
                    (project) => project.projectId === row.project_id
                )[0];
                project.members.push(row.member_id);
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
    let newProject;
    if (name != "") {
        db.addNewProject(userId, name, description, logo)
            .then(({ rows }) => {
                newProject = {
                    projectId: rows[0].id,
                    ownerId: userId,
                    members: [userId],
                    name,
                    description,
                    logo,
                };
                return db.getProjectOwnerName(newProject.projectId);
            })
            .then(({ rows }) => {
                newProject["ownerName"] = rows[0].name;
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
    let projectId, project;
    db.getProjectFromActiveCode(code)
        .then(({ rows }) => {
            projectId = rows[0].project_id;
            return db.addMemberToProject(userId, projectId);
        })
        .then(() => db.expireInviteCode(code))
        .then(() => db.getProjectById(projectId))
        .then(({ rows }) => {
            project = {
                projectId,
                ownerId: rows[0].owner_id,
                name: rows[0].name,
                description: rows[0].description,
                logo: rows[0].logo,
            };
            return db.getProjectOwnerName(projectId);
        })
        .then(({ rows }) => {
            project["ownerName"] = rows[0].name;
            return db.getProjectMembersByProjectIds([projectId]);
        })
        .then(({ rows }) => {
            project = {
                ...project,
                members: [project.ownerId, ...rows.map((row) => row.member_id)],
            };
            return db.getNonOwnedTasksByProjectId(userId, [projectId]);
        })
        .then(({ rows }) => {
            const tasks = rows.map((row) => {
                return {
                    taskId: row.id,
                    taskOwnerId: row.owner_id,
                    projectId: row.project_id,
                    ownerName: row.name,
                    title: row.title,
                    description: row.description,
                    status: row.status,
                    dueDate: row.due_date,
                };
            });
            res.json({ userId, project, tasks, success: true });
        })
        .catch((err) => {
            console.log("Err in joinProject:", err);
            res.json({ success: false });
        });
});

projectRouter
    .route("/api/project/:id/members")
    .get((req, res) => {
        const projectId = parseInt(req.params.id);
        const { userId } = req.session;
        helpers
            .checkIfUserIsMemberOfProject(userId, projectId)
            .then(() => db.getUserNamesByProjectId(projectId))
            .then(({ rows }) => {
                res.json({ memberNames: rows, success: true });
            })
            .catch((err) => {
                console.log("Err in getUserNamesByProjectId:", err);
                res.json({ success: false });
            });
    })
    .delete((req, res) => {
        const projectId = parseInt(req.params.id);
        const { userId } = req.session;
        const { memberId } = req.body;
        if (userId !== memberId) {
            helpers
                .checkIfUserIsProjectOwner(userId, projectId)
                .then(() =>
                    db.deleteTasksFromProjectByUserId(memberId, projectId)
                )
                .then(() => db.removeMemberFromProject(memberId, projectId))
                .then(() => {
                    io.to(`project:${projectId}`).emit(
                        "removeMemberFromProject",
                        { projectId, memberId }
                    );
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("Err in delete member from project:", err);
                    res.json({ success: false });
                });
        } else {
            helpers
                .checkIfUserIsNotProjectOwner(userId, projectId)
                .then(() =>
                    db.deleteTasksFromProjectByUserId(memberId, projectId)
                )
                .then(() => db.removeMemberFromProject(memberId, projectId))
                .then(() => {
                    io.to(`project:${projectId}`).emit(
                        "removeMemberFromProject",
                        { projectId, memberId }
                    );
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("Err in delete member from project:", err);
                    res.json({ success: false });
                });
        }
    });

projectRouter
    .route("/api/project/:id/invites")
    .get((req, res) => {
        const projectId = req.params.id;
        const { userId } = req.session;
        helpers
            .checkIfUserIsMemberOfProject(userId, projectId)
            .then(() => db.getActiveProjectInviteCodes(projectId))
            .then(({ rows }) => {
                const codes = rows.map((row) => {
                    return { code: row.invite_code, expiresOn: row.expires_on };
                });
                res.json({ codes, success: true });
            })
            .catch((err) => {
                console.log("Err in getActiveProjectInviteCodes:", err);
                res.json({ success: false });
            });
    })
    .post((req, res) => {
        const projectId = req.params.id;
        const { userId } = req.session;
        const inviteCode = cryptoRandomString({
            length: 6,
            type: "distinguishable",
        });
        helpers
            .checkIfUserIsMemberOfProject(userId, projectId)
            .then(() => db.addInviteCode(projectId, userId, inviteCode))
            .then(({ rows }) => {
                res.json({
                    code: { code: inviteCode, expiresOn: rows[0].expires_on },
                    success: true,
                });
            })
            .catch((err) => {
                console.log("Err in addInviteCode:", err);
                res.json({ success: false });
            });
    });

projectRouter.route("/api/project/:id/archive").get((req, res) => {
    const { userId } = req.session;
    const projectId = req.params.id;

    helpers
        .checkIfUserIsMemberOfProject(userId, projectId)
        .then(() => db.getArchivedTasksByProjectId(projectId))
        .then(({ rows }) => {
            res.json({ archivedTasks: rows, success: true });
        })
        .catch((err) => {
            console.log("Err in getArchivedTasks:", err);
            res.json({ success: false });
        });
});

projectRouter
    .route("/api/project/:id")
    .post((req, res) => {
        const projectId = parseInt(req.params.id);
        const { userId } = req.session;
        const { ownerId, name, description, logo } = req.body;
        helpers
            .checkIfUserIsMemberOfProject(userId, projectId)
            .then(() => {
                return db.updateProject(
                    projectId,
                    ownerId,
                    name,
                    description,
                    logo
                );
            })
            .then(() => {
                const updatedProject = {
                    id: projectId,
                    project: { ownerId, name, description, logo },
                };
                io.to(`project:${projectId}`).emit(
                    "updateProject",
                    updatedProject
                );
                res.json({ success: true });
            })
            .catch((err) => {
                console.log("Err in updateProject:", err);
                res.json({ success: false });
            });
    })
    .delete((req, res) => {
        const { userId } = req.session;
        const projectId = parseInt(req.params.id);
        helpers
            .checkIfUserIsProjectOwner(userId, projectId)
            .then(() => db.deleteTasksByProjectId(projectId))
            .then(() => db.deleteInviteCodeByProjectId(projectId))
            .then(() => db.deleteAllMembersFromProjects([projectId]))
            .then(() => db.deleteProject(projectId))
            .then(() => {
                io.to(`project:${projectId}`).emit("deleteProject", projectId);
                res.json({ success: true });
            })
            .catch((err) => {
                console.log("Err in deleteProject:", err);
                res.json({ success: false });
            });
    });

module.exports = projectRouter;
