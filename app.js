const express = require("express");
const mainRouter = require("./server/routes/mainRouter.js");
const port = process.env.PORT || 8080;
const stylus = require("stylus");

const app = express();

app.use(stylus.middleware({
    src: "./public/styles",
    dest: "./public",
    debug: true,
    force: true
}));

app.set("views", "./server/views");
app.set("view engine", "pug");

app.use(express.static("./public"));

app.use("/", mainRouter);


app.listen(port, (e) => e ? "" : console.log(`Server running. http://localhost:${port}`));