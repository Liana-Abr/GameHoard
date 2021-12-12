const router = require("express").Router();

const links = [
    { name: "Каталог", url: "/catalogue" },
    { name: "Контакты", url: "/contacts" }
];

// const catalogue_tabs = [
//     { name: "Ролевые игры", url: "/catalogue/:rpgames" },
//     { name: "ККИ", url: "/catalogue/:ccg" },
//     { name: "Warhammer", url: "/catalogue/:warhammer" },
//     { name: "Пазлы и гловоломки", url: "/catalogue/:puzzles" },
//     { name: "Книги и комиксы", url: "/catalogue/:bc" },
//     { name: "Сборные модели", url: "/catalogue/:models" }
// ];

const catalogue_tabs = [
    { name: "Warhammer", url: "/catalogue/:warhammer" },
    { name: "ККИ", url: "/catalogue/:ccg" },
    { name: "Ролевые игры", url: "/catalogue/:rpgames" },
    { name: "Пазлы и гловоломки", url: "/catalogue/:puzzles" },
    { name: "Сборные модели", url: "/catalogue/:models" }
];

router.get("/", (req, res) => {
    res.render("index", {
        title: "Настольные игры",
        links: links,
        catalogue_tabs: catalogue_tabs,
        class: "dark"
    });
});

router.get("/basket", (req, res) => {
    res.render("basket", {
        title: "Корзина",
        links: links,
        catalogue_tabs: catalogue_tabs
    });
});

router.get("/profile", (req, res) => {
    res.render("profile", {
        title: "Профиль",
        links: links,
        catalogue_tabs: catalogue_tabs
    });
});

router.get("/catalogue", (req, res) => {
    res.render("catalogue", {
        title: "Каталог",
        links: links,
        catalogue_tabs: catalogue_tabs
    });
});

router.get('/catalogue/:name', (req, res) => {
    res.render('catalogue', {
        title: 'Каталог',
        caption: req.params.name,
        links: links,
        catalogue_tabs: catalogue_tabs
    });
});

router.get("/contacts", (req, res) => {
    res.render("index", {
        title: "Контакты",
        links: links,
        catalogue_tabs: catalogue_tabs
    });
});

router.get("/profile", (req, res) => {
    res.render("index", {
        title: "Профиль",
        links: links,
        catalogue_tabs: catalogue_tabs
    });
});

router.get("/basket", (req, res) => {
    res.render("index", {
        title: "Корзина",
        links: links,
        catalogue_tabs: catalogue_tabs
    });
});

router.get("*", (req, res) => {
    res.status(404);
    res.render('error', {
        title: 'Error',
        caption: 'Ошибка, данный запрос не существует',
        links: links,
        catalogue_tabs: catalogue_tabs
    });
});

module.exports = router;