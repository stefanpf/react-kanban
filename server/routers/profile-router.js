const express = require("express");
const profileRouter = express.Router();
const db = require("../utils/db");
const { checkValidEmail } = require("../utils/helper-functions");

profileRouter
    .route("/api/profile")
    .get((req, res) => {
        const { userId } = req.session;
        db.getUserDataById(userId)
            .then(({ rows }) => {
                res.json({ profileData: rows[0], success: true });
            })
            .catch((err) => {
                console.log("Err in getUserDataById:", err);
                res.json({ success: false });
            });
    })
    .post((req, res) => {
        const { userId } = req.session;
        const { name, email } = req.body;
        if (checkValidEmail(email)) {
            db.updateUserData(userId, name, email)
                .then(() => res.json({ success: true }))
                .catch((err) => {
                    console.log("Err in updateUserData:", err);
                    res.json({ success: false });
                });
        } else {
            res.json({ success: false });
        }
    });

module.exports = profileRouter;
