require("dotenv").config();
const router = require("express").Router();
const nodemailer = require("nodemailer");
const checkMiddleware = require("../middleware/check.js");
const db = require("../../db.js");

const links = [
    { name: "Главная", url: "/" },
    { name: "Каталог", url: "/catalogue?p=1" },
];

const catalogue_tabs = [
    { name: "Warhammer", url: "/catalogue/warhammer" },
    { name: "ККИ", url: "/catalogue/ccg" },
    { name: "Ролевые игры", url: "/catalogue/rpgames" },
    { name: "Пазлы и гловоломки", url: "/catalogue/puzzles" },
    { name: "Сборные модели", url: "/catalogue/models" },
];

const daygame = {
    ID_Product: "pf123321",
    Name_Product: "Pathfinder",
    Izdatel_ID: "Pathfinder",
    Date_Vypusk_Product: Date(22 - 12 - 2021),
    Category_ID: "rpgames",
    Podcategory_ID: "pf",
    Min_Igrok_Product: 2,
    Vozrast_Ogranich_Product: 13,
    Opisanie_Product:
        "Легендарная карточная игра Pathfinder вышла в новой редакции с переработанными правилами и усовершенствованным игровым процессом.",
    Price_Product: 5000,
    Skidka_Product: null,
    Vremya_Igri_Product: 60,
    Img_Product: "pathfinder.jpg",
};

router.get("/", async (req, res) => {
    const products = await db.query(`select * from product`);
    const slider = await db.query(`select * from slider`);
    res.render("index", {
        title: "Настольные игры",
        links: links,
        catalogue_tabs: catalogue_tabs,
        products: products.rows,
        slider: slider.rows,
        newproduct: products.rows,
        class: "dark",
    });
});

router.get("/catalogue", checkMiddleware, async (req, res) => {
    const products = await db.query(
        `select * from product ${req.headers.check}`
    );
    res.render("catalogue", {
        title: "Каталог",
        links: links,
        page: req.query.p || 1,
        catalogue_tabs: catalogue_tabs,
        daygame: daygame,
        products: products.rows,
    });
});

router.get("/catalogue/:category", checkMiddleware, async (req, res) => {
    let category_id;
    if (req.params.category == "warhammer") {
        category_id = 1;
    } else if (req.params.category == "ccg") {
        category_id = 2;
    } else if (req.params.category == "rpgames") {
        category_id = 3;
    } else if (req.params.category == "puzzles") {
        category_id = 4;
    } else if (req.params.category == "models") {
        category_id = 5;
    }

    let podcat_id;
    if (req.query.podcat == "w40k") {
        podcat_id = 1;
    } else if (req.query.podcat == "bg") {
        podcat_id = 2;
    } else if (req.query.podcat == "mtg") {
        podcat_id = 3;
    } else if (req.query.podcat == "berserk") {
        podcat_id = 4;
    } else if (req.query.podcat == "dnd") {
        podcat_id = 5;
    } else if (req.query.podcat == "pf") {
        podcat_id = 6;
    }

    let products;
    if (podcat_id > 0) {
        if (req.headers.check) {
            products = await db.query(
                `select * from product ${req.headers.check} and category_id = $1 and podcategory_id = $2`,
                [category_id, podcat_id]
            );
        } else {
            products = await db.query(
                `select * from product where category_id = $1 and podcategory_id = $2`,
                [category_id, podcat_id]
            );
        }
    } else {
        if (req.headers.check) {
            products = await db.query(
                `select * from product ${req.headers.check} and category_id = $1`,
                [category_id]
            );
        } else {
            products = await db.query(
                "select * from product where category_id = $1",
                [category_id]
            );
        }
    }
    res.render("catalogue", {
        title: "Каталог",
        links: links,
        page: req.query.p || 1,
        catalogue_tabs: catalogue_tabs,
        daygame: daygame,
        products: products.rows,
    });
});
router.get("/catalogue/product/:id", async (req, res) => {
    let product;
    if (!isNaN(+req.params.id)) {
        product = await db.query(
            "select * from product where id_product = $1",
            [req.params.id]
        );
    } else {
        res.redirect("/");
    }
    res.render("product", {
        product: product.rows[0],
        links: links,
        catalogue_tabs: catalogue_tabs,
    });
});
router.get("/contacts", (req, res) => {
    res.render("index", {
        title: "Контакты",
        links: links,
        catalogue_tabs: catalogue_tabs,
    });
});

module.exports = router;
