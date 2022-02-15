function requireLoggedInUser(req, res, next) {
    if (req.path == "/") return next();

    if (!req.session.userId) {
        res.redirect("/");
    } else {
        next();
    }
}

module.exports = {
    requireLoggedInUser,
};
