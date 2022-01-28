const express = require("express");
const taskRouter = express.Router();
const db = require("../utils/db");

taskRouter.post("/api/task", (req, res) => {
    console.log("user wants to save a new task to DB");
    res.sendStatus(200);
});
module.exports = taskRouter;
