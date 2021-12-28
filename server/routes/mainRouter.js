require('dotenv').config();
const router = require("express").Router();
const nodemailer = require("nodemailer");
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

router.get("/send_email", async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDEMAIL,
            pass: process.env.SENDPASS
        }
    });
    const mailOptions = {
        from: process.env.SENDEMAIL,
        to: req.query.email,
        subject: 'HELLO EMAIL WORLD',
        text: 'Hello to myself!',
        html: `<!doctype html>
        <html ⚡4email>

            <head>
            <meta charset="utf-8">
            <style amp4email-boilerplate>body{visibility:hidden}</style>
            <script async src="https://cdn.ampproject.org/v0.js"></script>
            <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
            </head>

            <body style="width: 100%;display: flex; align-items: center; justify-content: center; background: #fff;">
            <p><b>Yo dude</b>, what's up?</p>
            <p>Сообщение отправленное через Node.js с использованием библиотеки nodemailer</p>

            <p>Это письмо было отправлено автоматически. Пожалуйста, не отвечайте на него.

            <p>А вот танцующий котиг:<br/>
            <img src="https://acegif.com/wp-content/gifs/dancing-cat-41.gif" width="500" height="450"/>
            </body>

        </html>`
    };

    transporter.sendMail(mailOptions);
    res.redirect('/');
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

router.get('/login', async (req, res) => {
    const category = await db.query(`select * from category`);
    const podcategory = await db.query(`select * from podcategory`);
    const izdatel = await db.query(`select * from izdatel`);
    console.log(req.query);
    if (req.query.email == process.env.EMAIL && req.query.password == process.env.PASSWORD) {
        console.log('1');
        res.render('admin', {
            admin: true,
            category: category.rows,
            podcategory: podcategory.rows,
            izdatel: izdatel.rows
        });
    } else {
        console.log('2')
        res.render('admin');
    }
});

router.get("/admin", async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            console.log(req.body);
            const img = req.files.img;
            const imgname = img.name;
            const tovar = new Product({
                title: req.body.title,
                autor: req.body.autor,
                date: req.body.date,
                price: req.body.price,
                status: req.body.status,
                status__class: req.body.status__class,
                genres: req.body.genres,
                img: imgname
            });
            await tovar.save();
            img.mv('public/images/' + imgname, (err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.redirect('/');
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;