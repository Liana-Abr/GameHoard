const router = require("express").Router();
const productController = require('../controllers/productController.js');
const checkMiddleware = require('../middleware/check.js');
const db = require('../../db.js');
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

const products2 = [
    {
        ID_Product: "dnd123123", Name_Product: "22222",
        Izdatel_ID: "microsoft", Date_Vypusk_Product: Date(22 - 12 - 2021),
        Category_ID: "rpgames", Podcategory_ID: "dnd",
        Min_Igrok_Product: 5, Vozrast_Ogranich_Product: 16,
        Opisanie_Product: 'Настольная ролевая фентези игра',
        Price_Product: 10000, Skidka_Product: null,
        Vremya_Igri_Product: 120, Img_Product: 'mafia.jpg'
    },
    {
        ID_Product: "123abc", Name_Product: "333333",
        Izdatel_ID: "123abc", Date_Vypusk_Product: Date(22 - 12 - 2021),
        Category_ID: "123abc", Podcategory_ID: "123abc",
        Min_Igrok_Product: 4, Vozrast_Ogranich_Product: 16,
        Opisanie_Product: 'Классическая Мафия для небольшой компании друзей',
        Price_Product: 40000, Skidka_Product: null,
        Vremya_Igri_Product: 30, Img_Product: 'mafia.jpg'
    },
    {
        ID_Product: "123abc", Name_Product: "4444444",
        Izdatel_ID: "123abc", Date_Vypusk_Product: Date(22 - 12 - 2021),
        Category_ID: "dnd", Podcategory_ID: "123abc",
        Min_Igrok_Product: 4, Vozrast_Ogranich_Product: 16,
        Opisanie_Product: 'Классическая Мафия для небольшой компании друзей',
        Price_Product: 40000, Skidka_Product: null,
        Vremya_Igri_Product: 30, Img_Product: 'mafia.jpg'
    },
    {
        ID_Product: "123abc", Name_Product: "4444444",
        Izdatel_ID: "123abc", Date_Vypusk_Product: Date(22 - 12 - 2021),
        Category_ID: "dnd", Podcategory_ID: "123abc",
        Min_Igrok_Product: 4, Vozrast_Ogranich_Product: 16,
        Opisanie_Product: 'Классическая Мафия для небольшой компании друзей',
        Price_Product: 40000, Skidka_Product: null,
        Vremya_Igri_Product: 30, Img_Product: 'mafia.jpg'
    }
];

const daygame = {
    ID_Product: "pf123321", Name_Product: "Pathfinder",
    Izdatel_ID: "Pathfinder", Date_Vypusk_Product: Date(22 - 12 - 2021),
    Category_ID: "rpgames", Podcategory_ID: "pf",
    Min_Igrok_Product: 2, Vozrast_Ogranich_Product: 13,
    Opisanie_Product: 'Легендарная карточная игра Pathfinder вышла в новой редакции с переработанными правилами и усовершенствованным игровым процессом.',
    Price_Product: 5000, Skidka_Product: null,
    Vremya_Igri_Product: 60, Img_Product: 'pathfinder.jpg'
};

router.get("/", async (req, res) => {
    const products = await db.query(`select * from product`);
    res.render("index", {
        title: "Настольные игры",
        links: links,
        catalogue_tabs: catalogue_tabs,
        products: products.rows,
        newproduct: products.rows,
        class: "dark"
    });
});

router.get("/catalogue", checkMiddleware, async (req, res) => {
    const products = await db.query(`select * from product ${req.headers.check}`);
    res.render("catalogue", {
        title: "Каталог",
        links: links,
        page: req.query.p || 1,
        catalogue_tabs: catalogue_tabs,
        daygame: daygame,
        products: products.rows
    });
});
router.get("/catalogue/:category", checkMiddleware, async (req, res) => {
    let category_id;
    if (req.params.category == 'warhammer') {
        category_id = 1;
    } else if (req.params.category == 'ccg') {
        category_id = 2;
    } else if (req.params.category == 'rpgames') {
        category_id = 3;
    } else if (req.params.category == 'puzzles') {
        category_id = 4;
    } else if (req.params.category == 'models') {
        category_id = 5;
    }
    let products;
    if (req.headers.check) {
        products = await db.query(`select * from product ${req.headers.check} and category_id = $1`, [category_id]);
    } else {
        products = await db.query('select * from product where category_id = $1', [category_id]);
    }
    res.render("catalogue", {
        title: "Каталог",
        links: links,
        page: req.query.p || 1,
        catalogue_tabs: catalogue_tabs,
        daygame: daygame,
        products: products.rows
    });
});
router.get('/catalogue/product/:id', async (req, res) => {
    const product = await db.query('select * from product where id_product = $1', [req.params.id]);
    res.render('product', {
        product: product.rows[0],
        links: links,
        catalogue_tabs: catalogue_tabs,
    });
});

router.get("/contacts", (req, res) => {
    res.render("index", {
        title: "Контакты",
        links: links,
        catalogue_tabs: catalogue_tabs
    });
});

// router.get("*", (req, res) => {
//     res.status(404);
//     res.render('error', {
//         title: 'Error',
//         caption: 'Ошибка, данный запрос не существует',
//         links: links,
//         catalogue_tabs: catalogue_tabs
//     });
// });

module.exports = router;