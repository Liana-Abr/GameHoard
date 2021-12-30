require('dotenv').config();
const express = require("express");
const mainRouter = require("./server/routes/mainRouter.js");
const dbRouter = require("./server/routes/dbRouter.js");
const adminRouter = require("./server/routes/adminRouter.js");
const port = process.env.PORT || 8080;
const stylus = require("stylus");
const cookieParser = require('cookie-parser');
const autoprefixer = require('autoprefixer-stylus');
const fileUpload = require('express-fileupload');
const expressSanitizer = require('express-sanitizer');

const app = express();

app.use(cookieParser());

app.use(stylus.middleware({
    src: "./public/styles",
    dest: "./public",
    debug: true,
    force: true,
    use: [autoprefixer({ overrideBrowserslist: ['ie 7', 'ie 8'] })]
}));

app.set("views", "./server/views");
app.set("view engine", "pug");

app.use(express.static("./public"));
app.use(express.json());
app.use(fileUpload());
app.use(expressSanitizer());

const links = [
    { name: "Главная", url: "/" },
    { name: "Каталог", url: "/catalogue?p=1" },
    { name: "О нас", url: "/contacts" }
];

const catalogue_tabs = [
    { name: "Warhammer", url: "/catalogue/warhammer" },
    { name: "ККИ", url: "/catalogue/ccg" },
    { name: "Ролевые игры", url: "/catalogue/rpgames" },
    { name: "Пазлы и гловоломки", url: "/catalogue/puzzles" },
    { name: "Сборные модели", url: "/catalogue/models" }
];

app.use("/", mainRouter);
app.use("/api", dbRouter);
app.use("/admin", adminRouter);
app.use((req, res) => {
    res.status(404);
    res.render('error', {
        title: 'Error',
        caption: 'Ошибка, данный запрос не существует',
        links: links,
        catalogue_tabs: catalogue_tabs
    });
});
app.listen(port, (e) => e ? console.log(e) : console.log(`Server running.`));