const db = require('../../db.js')

class AkziiController{
    async createAkzii(req, res){
        try {
            const{name_akzii} = req.body
            const mod_name = name_akzii.replace('+', " ")
            const akzii = await db.query('call akzii_insert($1)', [mod_name])
            res.redirect('/admin/akzii');
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async getAllAkzii(req, res){
        const akzii = await db.query('select * from akzii')
        res.json(akzii.rows)
    }
    async getAkzii(req, res){
        const id = req.params.id
        const akzii = await db.query('select * from akzii where id_akzii = $1', [id])
        res.json(akzii.rows[0])
    }
    async updateAkzii(req, res){
        try{
            const {id_akzii, name_akzii} = req.body
            const mod_name = name_akzii.replace('+', " ")
            const akzii = await db.query('call akzii_update($1, $2)', [id_akzii, mod_name])
            res.redirect('/admin/akzii');
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async deleteAkzii(req, res){
        try{
            const id = req.body.id
            const akzii = await db.query('delete from akzii where id_akzii = $1', [id])
            res.redirect('/admin/akzii');
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = new AkziiController