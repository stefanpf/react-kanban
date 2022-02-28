const express = require("express");
const compression = require("compression");
const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    secret:
        process.env.SESSION_SECRET ||
        require("../secrets").COOKIE_SESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true,
});
const path = require("path");
const db = require("./utils/db");
const app = express();
const server = require("http").Server(app);

// create and export IO before Routers are imported
// to prevent circular import problems as they require IO
const SOCKET_HOSTNAME =
    process.env.SOCKET_HOSTNAME || require("../secrets").SOCKET_HOSTNAME;
const io = require("socket.io")(server, {
    allowRequest: (req, callback) => {
        callback(
            null,
            req.headers.referer.startsWith(`https://${SOCKET_HOSTNAME}`) ||
                req.headers.referer.startsWith(`http://${SOCKET_HOSTNAME}`) ||
                req.headers.referer.startsWith("http://localhost:3000") ||
                req.headers.referer.startsWith("http://127.0.0.1:3000")
        );
    },
});
module.exports = { io };

const authRouter = require("./routers/auth-router");
const profileRouter = require("./routers/profile-router");
const projectRouter = require("./routers/project-router");
const taskRouter = require("./routers/task-router");
const PORT = 3001;

// MIDDLEWARE
if (process.env.NODE_ENV == "production") {
    app.use((req, res, next) => {
        if (req.headers["x-forwarded-proto"].startsWith("https")) {
            return next();
        }
        res.redirect(`https://${req.hostname}${req.url}`);
    });
}
app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());

// ROUTES
app.use(authRouter);
app.use(profileRouter);
app.use(projectRouter);
app.use(taskRouter);
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// START SERVER
server.listen(process.env.PORT || PORT, function () {
    console.log("I'm listening.");
});

// WEBSOCKET SETUP
const onlineUsers = {};

io.on("connection", (socket) => {
    const userId = socket.request.session.userId;
    if (!userId) {
        return socket.disconnect(true);
    }
    onlineUsers[socket.id] = userId;

    db.getProjectIdsByUserId(userId).then(({ rows }) => {
        rows.forEach((row) => {
            socket.join(`project:${row.id}`);
        });
    });

    socket.on("joinProject", (projectId) => {
        socket.join(`project:${projectId}`);
        io.to(`project:${projectId}`).emit("addMemberToProject", {
            projectId,
            memberId: socket.request.session.userId,
        });
    });

    socket.on("disconnect", () => {
        delete onlineUsers[socket.id];
    });
});
