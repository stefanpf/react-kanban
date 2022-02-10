const express = require("express");
const profileRouter = express.Router();
const db = require("../utils/db");

profileRouter.route("/api/profile").get((req, res) => {
    const { userId } = req.session;
    db.getUserDataById(userId)
        .then(({ rows }) => {
            res.json({ profileData: rows[0], success: true });
        })
        .catch((err) => {
            console.log("Err in getUserDataById:", err);
            res.json({ success: false });
        });
});

module.exports = profileRouter;
