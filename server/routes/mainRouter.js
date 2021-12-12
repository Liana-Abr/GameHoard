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
    {
        name: "Warhammer", url: "/catalogue/:warhammer", tabs: [
            { name: "Warhammer 40000", url: "/catalogue/:warhammer?p=w4k" },
            { name: "Warhammer Age of Sigmar", url: "/catalogue/:warhammer?p=waof" },
            { name: "Коробочные Игры", url: "/catalogue/:warhammer?p=bg" },
            { name: "Краски Citadel Colour", url: "/catalogue/:warhammer?p=ccc" }
        ]
    },
    {
        name: "ККИ", url: "/catalogue/:ccg", tabs: [
            { name: "MTG", url: "/catalogue/:ccg?p=mtg" },
            { name: "Gwent", url: "/catalogue/:ccg?p=gwent" },
            { name: "Берсерк. Герои", url: "/catalogue/:ccg?p=berserk" },
            { name: "Star Wars: Destiny", url: "/catalogue/:ccg?p=swd" }
        ]
    },
    {
        name: "Ролевые игры", url: "/catalogue/:rpgames", tabs: [
            { name: "Dungeons&Dragons", url: "/catalogue/:rpgames?p=dnd" },
            { name: "Pathfinder", url: "/catalogue/:rpgames?p=pf" },
            { name: "Кориолис", url: "/catalogue/:rpgames?p=kor" },
            { name: "Game of Thrones", url: "/catalogue/:rpgames?p=got" }
        ]
    },
    {
        name: "Пазлы и гловоломки", url: "/catalogue/:puzzles", tabs: [
            { name: "Пазлы", url: "/catalogue/:puzzles?p=puzzles" },
            { name: "Головоломки", url: "/catalogue/:puzzles?p=brainteaser" }
        ]
    },
    {
        name: "Сборные модели", url: "/catalogue/:models", tabs: [
            { name: "Техника", url: "/catalogue/:models?p=tech" },
            { name: "Авиация", url: "/catalogue/:models?p=aviation" },
            { name: "Автомобили", url: "/catalogue/:models?p=cars" }
        ]
    }
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