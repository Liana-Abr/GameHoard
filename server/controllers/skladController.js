const db = require("../../db.js");

class SkladController {
    async createSklad(req, res) {
        try {
            const { product_id, nalichie_sklad } = req.body;
            const sklad = await db.query("call sklad_insert($1, $2)", [
                product_id,
                nalichie_sklad,
            ]);
            res.redirect("/admin/sklad");
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async getAllSklad(req, res) {
        const { product_id } = req.query;
        let a = "";
        if (product_id) {
            a = `where product_id = ${product_id}`;
        }
        const sklad = await db.query(`select * from sklad ${a}`);
        res.json(sklad.rows);
    }
    async getSklad(req, res) {
        const id = req.params.id;
        const sklad = await db.query("select * from sklad where id_sklad = $1", [
            id,
        ]);
        res.json(sklad.rows[0]);
    }
    async updateSklad(req, res) {
        try {
            const { id_sklad, product_id, nalichie_sklad } = req.body;
            const sklad = await db.query("call sklad_update($1, $2, $3)", [
                id_sklad,
                product_id,
                nalichie_sklad,
            ]);
            res.redirect("/admin/sklad");
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async updateSkladNalichie(req, res) {
        const { id_sklad, nalichie_sklad } = req.query;
        if (nalichie_sklad >= 0) {
            const sklad = await db.query("call sklad_add_nalichie($1, $2)", [
                id_sklad,
                nalichie_sklad,
            ]);
        } else {
            const sklad = await db.query("call sklad_sub_nalichie($1, $2)", [
                id_sklad,
                nalichie_sklad,
            ]);
        }
        res.json();
    }
    async updateSkladProdano(req, res) {
        const { id_sklad, prodano_sklad } = req.query;
        const sklad = await db.query("call sklad_add_prodano($1, $2)", [
            id_sklad,
            prodano_sklad,
        ]);
        res.json();
    }
    async deleteSklad(req, res) {
        try {
            const id = req.body.id;
            const sklad = await db.query("delete from sklad where id_sklad = $1", [
                id,
            ]);
            res.redirect("/admin/sklad");
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = new SkladController();
