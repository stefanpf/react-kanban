const express = require("express");
const projectRouter = express.Router();
const db = require("../utils/db");

projectRouter.post("/api/project/new", (req, res) => {
    const { userId } = req.session;
    console.log(`user ${userId} wants to create a new project:`, req.body);
    res.json({ success: false });
});

module.exports = projectRouter;
