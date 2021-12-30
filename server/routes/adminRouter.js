require('dotenv').config();
const router = require("express").Router();
const db = require('../../db.js');

router.get('/', async (req, res) => {
    if (req.query.email == process.env.EMAIL && req.query.password == process.env.PASSWORD) {
        res.cookie('role', 'admin');
    }
    res.render('admin/index', {
        role: req.cookies['role']
    });
});

router.get('/product', async (req, res) => {
    const category = await db.query(`select * from category`);
    const podcategory = await db.query(`select * from podcategory`);
    const product = await db.query(`select * from product`);
    const izdatel = await db.query(`select * from izdatel`);
    if (req.query.email == process.env.EMAIL && req.query.password == process.env.PASSWORD) {
        res.cookie('role', 'admin')
    }
    res.render('admin/product', {
        role: req.cookies['role'],
        category: category.rows,
        podcategory: podcategory.rows,
        product: product.rows,
        izdatel: izdatel.rows
    });
});

router.get('/akzii', async (req, res) => {
    const akzii = await db.query(`select * from akzii`);
    if (req.query.email == process.env.EMAIL && req.query.password == process.env.PASSWORD) {
        res.cookie('role', 'admin');
    }
    res.render('admin/akzii', {
        role: req.cookies['role'],
        akzii: akzii.rows
    });
});

router.get('/category', async (req, res) => {
    const category = await db.query(`select * from category`);
    if (req.query.email == process.env.EMAIL && req.query.password == process.env.PASSWORD) {
        res.cookie('role', 'admin');
    }
    res.render('admin/category', {
        role: req.cookies['role'],
        category: category.rows
    });
});

router.get('/izdatel', async (req, res) => {
    const izdatel = await db.query(`select * from izdatel`);
    if (req.query.email == process.env.EMAIL && req.query.password == process.env.PASSWORD) {
        res.cookie('role', 'admin');
    }
    res.render('admin/izdatel', {
        role: req.cookies['role'],
        izdatel: izdatel.rows
    });
});

router.get('/podcategory', async (req, res) => {
    const category = await db.query(`select * from category`);
    const podcategory = await db.query(`select * from podcategory`);
    if (req.query.email == process.env.EMAIL && req.query.password == process.env.PASSWORD) {
        res.cookie('role', 'admin');
    }
    res.render('admin/podcategory', {
        role: req.cookies['role'],
        category: category.rows,
        podcategory: podcategory.rows
    });
});

router.get('/rassylka', async (req, res) => {
    const rassylka = await db.query(`select * from rassylka`);
    if (req.query.email == process.env.EMAIL && req.query.password == process.env.PASSWORD) {
        res.cookie('role', 'admin');
    }
    res.render('admin/rassylka', {
        role: req.cookies['role'],
        rassylka: rassylka.rows
    });
});

router.get('/sklad', async (req, res) => {
    const sklad = await db.query(`select * from sklad`);
    const product = await db.query(`select * from product`);
    if (req.query.email == process.env.EMAIL && req.query.password == process.env.PASSWORD) {
        res.cookie('role', 'admin');
    }
    res.render('admin/sklad', {
        role: req.cookies['role'],
        product: product.rows,
        sklad: sklad.rows
    });
});

router.get('/slider', async (req, res) => {
    const slider = await db.query(`select * from slider`);
    const product = await db.query(`select * from product`);
    if (req.query.email == process.env.EMAIL && req.query.password == process.env.PASSWORD) {
        res.cookie('role', 'admin');
    }
    res.render('admin/slider', {
        role: req.cookies['role'],
        product: product.rows,
        slider: slider.rows
    });
});

router.get('/sposob_oplaty', async (req, res) => {
    const sposob_oplaty = await db.query(`select * from sposob_oplaty`);
    if (req.query.email == process.env.EMAIL && req.query.password == process.env.PASSWORD) {
        res.cookie('role', 'admin');
    }
    res.render('admin/sposob_oplaty', {
        role: req.cookies['role'],
        sposob_oplaty: sposob_oplaty.rows
    });
});


module.exports = router;