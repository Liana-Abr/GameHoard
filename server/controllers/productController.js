const db = require('../../db.js');

class ProductController {
    async createProduct(req, res) {
        try {
            if (!req.files) {
                console.log(req);
                console.log(req.body);
                res.send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {
                const { name_product, izdatel_id, date_vypusk_product, category_id, podcategory_id, min_igrok_product, vozrast_ogranich_product, opisanie_product, price_product, vremya_igry_product} = req.body;
                const img = req.files.image_product;
                const imgname = img.name;
                const newProduct = await db.query('call product_insert($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [name_product, izdatel_id, date_vypusk_product, category_id, podcategory_id, min_igrok_product, vozrast_ogranich_product, opisanie_product, price_product, vremya_igry_product, imgname]);
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
    }
    async getAllProducts(req, res) {
        const { name_product, izdatel_id, category_id, podcategory_id, min_igrok_product, vozrast_ogranich_product, min_price_product, max_price_product, min_vremya_igry_product, max_vremya_igry_product } = req.query;
        const arr = [];
        let a = '';
        if (name_product) {
            arr.push(`name_product = ${name_product}`);
        }
        if (izdatel_id) {
            arr.push(`izdatel_id = ${izdatel_id}`);
        }
        if (category_id) {
            arr.push(`category_id = ${category_id}`);
        }
        if (podcategory_id) {
            arr.push(`podcategory_id = ${podcategory_id}`);
        }
        if (min_igrok_product) {
            arr.push(`min_igrok_product = ${min_igrok_product}`);
        }
        if (vozrast_ogranich_product) {
            arr.push(`vozrast_ogranich_product = ${vozrast_ogranich_product}`);
        }
        if (min_price_product) {
            arr.push(`price_product > ${min_price_product}`);
        }
        if (max_price_product) {
            arr.push(`price_product < ${max_price_product}`);
        }
        if (min_vremya_igry_product) {
            arr.push(`vremya_igry_product > ${min_vremya_igry_product}`);
        }
        if (max_vremya_igry_product) {
            arr.push(`vremya_igry_product < ${max_vremya_igry_product}`);
        }
        if (arr.length > 0) {
            a = `where ${arr.join(' and ')}`;
        }
        const products = await db.query(`select * from product ${a}`);
        res.json(products.rows);
    }
    async getProduct(req, res) {
        const id = req.params.id;
        const product = await db.query('select * from product where id_product = $1', [id]);
        res.json(product.rows[0]);
    }
    async getOneProduct(req, res) {
        const val = req.headers.value;
        const product = await db.query(`select * from product where name_product like '${val}%'`);
        res.json(product.rows);
    }
    async updateProduct(req, res) {
        const { id_product, name_product, izdatel_id, date_vypusk_product, category_id, podcategory_id, min_igrok_product, vozrast_ogranich_product, opisanie_product, price_product, vremya_igry_product, image_product } = req.body;
        const product = await db.query('call product_update($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [id_product, name_product, izdatel_id, date_vypusk_product, category_id, podcategory_id, min_igrok_product, vozrast_ogranich_product, opisanie_product, price_product, vremya_igry_product, image_product]);
        res.json();
    }
    async deleteProduct(req, res) {
        const id = req.query.id;
        const product = await db.query('delete from product where id_product = $1', [id]);
        res.json();
    }
    async setSkidkaProduct(req, res) {
        const { id_product, skidka_product } = req.body;
        const product = await db.query('call product_set_skidka($1, $2)', [id_product, skidka_product]);
        res.json();
    }
}

module.exports = new ProductController();