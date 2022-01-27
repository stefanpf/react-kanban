const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const PORT = 3001;

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || PORT, function () {
    console.log("I'm listening.");
});
