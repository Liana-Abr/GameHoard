const db = require("../../db.js");

class CategoryController {
    async createCategory(req, res) {
        try {
            const { name_category } = req.body;
            const category = await db.query("call category_insert($1)", [
                name_category,
            ]);
            res.redirect("/admin/category");
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async getAllCategory(req, res) {
        const category = await db.query("select * from category");
        res.json(category.rows);
    }
    async getCategory(req, res) {
        const id = req.params.id;
        const category = await db.query(
            "select * from category where id_category = $1",
            [id]
        );
        res.json(category.rows[0]);
    }
    async updateCategory(req, res) {
        try {
            const { id_category, name_category } = req.body;
            const category = await db.query("call category_update($1, $2)", [
                id_category,
                name_category,
            ]);
            res.redirect("/admin/category");
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async deleteCategory(req, res) {
        try {
            const id = req.body.id;
            const category = await db.query(
                "delete from category where id_category = $1",
                [id]
            );
            res.redirect("/admin/category");
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = new CategoryController();
