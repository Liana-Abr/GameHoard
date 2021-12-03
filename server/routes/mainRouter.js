const router = require("express").Router();

const links = [
    { name: "Каталог", src: "/catalogue" },
    { name: "Контакты", src: "/contacts" },
    { name: "Профиль", src: "/profile" }
];

router.get("/", (req, res) => {
    res.render("index", {
        title: "Настольные игры",
        links: links,
        class: "dark"
    });
});

router.get("/basket", (req, res) => {
    res.render("basket", {
        title: "Корзина",
        links: links
    });
});

router.get("/profile", (req, res) => {
    res.render("profile", {
        title: "Профиль",
        links: links
    });
});

router.get("/catalogue", (req, res) => {
    res.render("catalogue", {
        title: "Каталог",
        links: links
    });
});

router.get('/catalogue/:name', (req, res) => {
    res.render('catalogue', {
        title: 'Каталог',
        caption: req.params.name,
        links: links
    });
});

router.get("/contacts", (req, res) => {
    res.render("index", {
        title: "Контакты",
        links: links
    });
});

router.get("/profile", (req, res) => {
    res.render("index", {
        title: "Профиль",
        links: links
    });
});

router.get("/basket", (req, res) => {
    res.render("index", {
        title: "Корзина",
        links: links
    });
});

router.get("*", (req, res) => {
    res.status(404);
    res.render('error', {
        title: 'Error',
        caption: 'Ошибка, данный запрос не существует',
        links: links
    });
});

module.exports = router;