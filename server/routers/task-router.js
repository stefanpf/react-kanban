const express = require("express");
const taskRouter = express.Router();
const db = require("../utils/db");

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
