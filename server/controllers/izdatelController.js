const db = require("../../db.js");

class IzdatelController {
    async createIzdatel(req, res) {
        try {
            const { name_izdatel } = req.body;
            const izdatel = await db.query("call izdatel_insert($1)", [
                name_izdatel,
            ]);
            res.redirect("/admin/izdatel");
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async getAllIzdatel(req, res) {
        const izdatel = await db.query("select * from izdatel");
        res.json(izdatel.rows);
    }
    async getIzdatel(req, res) {
        const id = req.params.id;
        const izdatel = await db.query(
            "select * from izdatel where id_izdatel = $1",
            [id]
        );
        res.json(izdatel.rows[0]);
    }
    async updateIzdatel(req, res) {
        try {
            const { id_izdatel, name_izdatel } = req.body;
            const izdatel = await db.query("call izdatel_update($1, $2)", [
                id_izdatel,
                name_izdatel,
            ]);
            res.redirect("/admin/izdatel");
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async deleteIzdatel(req, res) {
        try {
            const id = req.body.id;
            const izdatel = await db.query(
                "delete from izdatel where id_izdatel = $1",
                [id]
            );
            res.redirect("/admin/izdatel");
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = new IzdatelController();
