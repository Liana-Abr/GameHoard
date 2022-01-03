const db = require("../../db.js");

class Zakaz_ProductController {
    async createZakaz_Product(req, res) {
        const { zakaz_id, product_id } = req.body;
        const zakaz_product = await db.query(
            "call zakaz_product_insert($1, $2)",
            [zakaz_id, product_id]
        );
        res.json();
    }
    async getAllZakaz_Product(req, res) {
        const { zakaz_id, product_id } = req.query;
        let a = "";
        const arr = [];
        if (zakaz_id) {
            arr.push(`zakaz_id = ${zakaz_id}`);
        }
        if (product_id) {
            arr.push(`product_id = ${product_id}`);
        }
        if (arr.length > 0) {
            a = `where ${arr.join(" and ")}`;
        }
        const zakaz_product = await db.query(
            `select * from zakaz_product ${a}`
        );
        res.json(zakaz_product.rows);
    }
    async getZakaz_Product(req, res) {
        const id = req.params.id;
        const zakaz_product = await db.query(
            "select * from zakaz_product where id_zakaz_product = $1",
            [id]
        );
        res.json(zakaz_product.rows[0]);
    }
    async updateZakaz_Product(req, res) {
        const { id_zakaz_product, zakaz_id, product_id } = req.body;
        const zakaz_product = await db.query(
            "call zakaz_product_update($1, $2, $3)",
            [id_zakaz_product, zakaz_id, product_id]
        );
        res.json();
    }
    async deleteZakaz_Product(req, res) {
        const id = req.query.id;
        const zakaz_product = await db.query(
            "delete from zakaz_product where id_zakaz_product = $1",
            [id]
        );
        res.json();
    }
}

module.exports = new Zakaz_ProductController();
