const router = require("express").Router();

const links = [
    { name: "Главная", url: "/" },
    { name: "Каталог", url: "/catalogue?p=1" },
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
        ID_Product: "dnd123123", Name_Product: "Dungeons&Dragons",
        Izdatel_ID: "microsoft", Date_Vypusk_Product: Date(22 - 12 - 2021),
        Category_ID: "rpgames", Podcategory_ID: "dnd",
        Min_Igrok_Product: 5, Vozrast_Ogranich_Product: 16,
        Opisanie_Product: 'Настольная ролевая фентези игра',
        Price_Product: 10000, Skidka_Product: null,
        Vremya_Igri_Product: 120, Img_Product: 'mafia.jpg'
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

router.get("/", (req, res) => {
    res.render("index", {
        title: "Настольные игры",
        links: links,
        catalogue_tabs: catalogue_tabs,
        products: products,
        newproduct: products2,
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
        page: req.query.p || 1,
        catalogue_tabs: catalogue_tabs,
        // path: 'Каталог',
        daygame: daygame,
        products: products
    });
});
router.get('/catalogue/:category', (req, res) => {
    if (req.query.i) {
        // let product = Product.query({ ID_Product=req.query.i });
        let product = products[0];
        res.render('product', {
            // title: product.Name_Product,
            // caption: product.Opisanie_Product,
            product: product,
            links: links,
            catalogue_tabs: catalogue_tabs,

        });
    } else {
        // let product = Product.query({ Category_ID=req.params.category });
        res.render("catalogue", {
            title: "Каталог",
            links: links,
            page: req.query.p || 1,
            daygame: daygame,
            // path: 'Каталог / ' + req.params.category,
            catalogue_tabs: catalogue_tabs,
            products: products
        });
    };
})


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