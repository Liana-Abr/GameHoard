const router = require("express").Router();

const links = [
    { name: "Главная", url: "/" },
    { name: "Каталог", url: "/catalogue" },
    { name: "О нас", url: "/contacts" }
];

const catalogue_tabs = [
    { name: "Warhammer", url: "/catalogue/:warhammer" },
    { name: "ККИ", url: "/catalogue/:ccg" },
    { name: "Ролевые игры", url: "/catalogue/:rpgames" },
    { name: "Пазлы и гловоломки", url: "/catalogue/:puzzles" },
    { name: "Сборные модели", url: "/catalogue/:models" }
];

const products = [
    {
        ID_Product: "123abc", Name_Product: "Мафия1",
        Izdatel_ID: "123abc", Date_Vypusk_Product: Date(22 - 12 - 2021),
        Category_ID: "123abc", Podcategory_ID: "123abc",
        Min_Igrok_Product: 4, Vozrast_Ogranich_Product: 16,
        Opisanie_Product: 'Классическая Мафия для небольшой компании друзей',
        Price_Product: 40000, Skidka_Product: null,
        Vremya_Igri_Product: 30, Img_Product: 'mafia.jpg'
    },
    {
        ID_Product: "123abc", Name_Product: "Мафия2",
        Izdatel_ID: "123abc", Date_Vypusk_Product: Date(22 - 12 - 2021),
        Category_ID: "123abc", Podcategory_ID: "123abc",
        Min_Igrok_Product: 4, Vozrast_Ogranich_Product: 16,
        Opisanie_Product: 'Классическая Мафия для небольшой компании друзей',
        Price_Product: 40000, Skidka_Product: null,
        Vremya_Igri_Product: 30, Img_Product: 'mafia.jpg'
    },
    {
        ID_Product: "123abc", Name_Product: "Мафия3",
        Izdatel_ID: "123abc", Date_Vypusk_Product: Date(22 - 12 - 2021),
        Category_ID: "123abc", Podcategory_ID: "123abc",
        Min_Igrok_Product: 4, Vozrast_Ogranich_Product: 16,
        Opisanie_Product: 'Классическая Мафия для небольшой компании друзей',
        Price_Product: 40000, Skidka_Product: null,
        Vremya_Igri_Product: 30, Img_Product: 'mafia.jpg'
    },
];

router.get("/", (req, res) => {
    res.render("index", {
        title: "Настольные игры",
        links: links,
        catalogue_tabs: catalogue_tabs,
        products: products,
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