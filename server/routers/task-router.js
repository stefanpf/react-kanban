const express = require("express");
const taskRouter = express.Router();
const db = require("../utils/db");
const { io } = require("../server");

taskRouter.get("/api/tasks", (req, res) => {
    const { userId } = req.session;
    let tasks;
    db.getTasksByOwnerId(userId)
        .then(({ rows }) => {
            tasks = rows.map((row) => {
                return {
                    taskId: row.id,
                    ownerName: row.name,
                    taskOwnerId: row.owner_id,
                    projectId: row.project_id,
                    dueDate: row.due_date,
                    title: row.title,
                    description: row.description,
                    status: row.status,
                };
            });
            return db.getProjectIdsByUserId(userId);
        })
        .then(({ rows }) => {
            return rows.map((row) => row.id);
        })
        .then((projectIds) => {
            return db.getNonOwnedTasksByProjectId(userId, projectIds);
        })
        .then(({ rows }) => {
            rows.forEach((row) =>
                tasks.push({
                    taskId: row.id,
                    ownerName: row.name,
                    taskOwnerId: row.owner_id,
                    projectId: row.project_id,
                    dueDate: row.due_date,
                    title: row.title,
                    description: row.description,
                    status: row.status,
                })
            );
            res.json({ tasks, success: true });
        })
        .catch((err) => {
            console.log("Err in getTasksByOwnerId:", err);
            res.json({ success: false });
        });
});

taskRouter.post("/api/task/new", (req, res) => {
    const { userId } = req.session;
    const { title, description, projectId, due_date: dueDate } = req.body;
    if (title) {
        db.addNewTask(
            userId,
            projectId,
            title,
            description || null,
            dueDate || null
        )
            .then(({ rows }) => {
                const newTask = {
                    taskId: rows[0].id,
                    taskOwnerId: userId,
                    projectId,
                    title,
                    status: 1,
                    description: description || null,
                    dueDate: dueDate || null,
                };

                io.to(`project:${projectId}`).emit("newTask", newTask);

                res.json({
                    success: true,
                });
            })
            .catch((err) => {
                console.log("Err in addNewTask:", err);
                res.json({ success: false });
            });
    } else {
        res.json({ success: false });
    }
});

taskRouter
    .route("/api/task/:id")
    .post((req, res) => {
        const taskId = parseInt(req.params.id);
        const { taskOwnerId, projectId, title, description, status, dueDate } =
            req.body;
        db.updateTask(
            taskId,
            taskOwnerId,
            projectId,
            title,
            description,
            dueDate,
            status
        )
            .then(() => {
                const updatedTask = {
                    taskId,
                    taskOwnerId,
                    projectId,
                    title,
                    description,
                    status,
                    dueDate,
                };
                io.to(`project:${projectId}`).emit("updateTask", updatedTask);
                res.json({ success: true });
            })
            .catch((err) => {
                console.log("Err in updateTask:", err);
                res.json({ success: false });
            });
    })
    .delete((req, res) => {
        const taskId = parseInt(req.params.id);
        const { userId } = req.session;
        const { projectId, ownerId } = req.body;
        if (userId === ownerId) {
            db.deleteTask(taskId, userId)
                .then(() => {
                    io.to(`project:${projectId}`).emit("deleteTask", taskId);
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("Err in deleteTask:", err);
                    res.json({ success: false });
                });
        } else {
            res.json({ success: false });
        }
    });

module.exports = taskRouter;
