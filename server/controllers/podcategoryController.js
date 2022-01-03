const db = require("../../db.js");

class PodcategoryController {
    async createPodcategory(req, res) {
        try {
            const { name_podcategory, category_id } = req.body;
            const podcategory = await db.query(
                "call podcategory_insert($1, $2)",
                [name_podcategory, category_id]
            );
            res.redirect("/admin/podcategory");
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async getAllPodcategory(req, res) {
        const { category_id } = req.query;
        let a = "";
        if (category_id) {
            a = `where category_id = ${category_id}`;
        }
        const podcategory = await db.query(`select * from podcategory ${a}`);
        res.json(podcategory.rows);
    }
    async getPodcategory(req, res) {
        const id = req.params.id;
        const podcategory = await db.query(
            "select * from podcategory where id_podcategory = $1",
            [id]
        );
        res.json(podcategory.rows[0]);
    }
    async updatePodcategory(req, res) {
        try {
            const { id_podcategory, name_podcategory, category_id } = req.body;
            const podcategory = await db.query(
                "call podcategory_update($1, $2, $3)",
                [id_podcategory, name_podcategory, category_id]
            );
            res.redirect("/admin/podcategory");
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async deletePodcategory(req, res) {
        try {
            const id = req.body.id;
            const podcategory = await db.query(
                "delete from podcategory where id_podcategory = $1",
                [id]
            );
            res.redirect("/admin/podcategory");
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = new PodcategoryController();
