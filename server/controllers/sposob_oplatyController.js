const db = require("../../db.js");

class Sposob_OplatyController {
    async createSposob_Oplaty(req, res) {
        try {
            const { name_sposob_oplaty } = req.body;
            const sposob_oplaty = await db.query(
                "call sposob_oplaty_insert($1)",
                [name_sposob_oplaty]
            );
            res.redirect("/admin/sposob_oplaty");
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async getAllSposob_Oplaty(req, res) {
        const sposob_oplaty = await db.query("select * from sposob_oplaty");
        res.json(sposob_oplaty.rows);
    }
    async getSposob_Oplaty(req, res) {
        const id = req.params.id;
        const sposob_oplaty = await db.query(
            "select * from sposob_oplaty where id_sposob_oplaty = $1",
            [id]
        );
        res.json(sposob_oplaty.rows[0]);
    }
    async updateSposob_Oplaty(req, res) {
        try {
            const { id_sposob_oplaty, name_sposob_oplaty } = req.body;
            const sposob_oplaty = await db.query(
                "call sposob_oplaty_update($1, $2)",
                [id_sposob_oplaty, name_sposob_oplaty]
            );
            res.redirect("/admin/sposob_oplaty");
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async deleteSposob_Oplaty(req, res) {
        try {
            const id = req.body.id;
            const sposob_oplaty = await db.query(
                "delete from sposob_oplaty where id_sposob_oplaty = $1",
                [id]
            );
            res.redirect("/admin/sposob_oplaty");
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = new Sposob_OplatyController();
