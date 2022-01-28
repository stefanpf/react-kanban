const express = require("express");
const taskRouter = express.Router();
const db = require("../utils/db");

taskRouter.get("/api/tasks", (req, res) => {
    const { userId } = req.session;
    db.getTasksByOwnerId(userId)
        .then(({ rows }) => {
            const tasks = rows.map((row) => {
                return {
                    taskId: row.id,
                    taskOwnerId: row.owner_id,
                    title: row.title,
                    description: row.description,
                    dueDate: row.due_date,
                };
            });
            res.json({ tasks, success: true });
        })
        .catch((err) => {
            console.log("Err in getTasksByOwnerId:", err);
            res.json({ success: false });
        });
});

taskRouter.post("/api/task/new", (req, res) => {
    const { userId } = req.session;
    const { title, description, due_date: dueDate } = req.body;
    if (title) {
        db.addNewTask(userId, title, description || null, dueDate || null)
            .then(({ rows }) => {
                res.json({ taskId: rows[0].id, success: true });
            })
            .catch((err) => {
                console.log("Err in addNewTask:", err);
                res.json({ success: false });
            });
    } else {
        res.json({ success: false });
    }
});

module.exports = taskRouter;
