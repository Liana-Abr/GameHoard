const db = require('../../db.js')

class AkziiController{
    async createAkzii(req, res){
        const{name_akzii} = req.body
        const akzii = await db.query('call akzii_insert($1)', [name_akzii])
        res.json()
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
        const {id_akzii, name_akzii} = req.body
        const akzii = await db.query('call akzii_update($1, $2)', [id_akzii, name_akzii])
        res.json()
    }
    async deleteAkzii(req, res){
        const id = req.query.id
        const akzii = await db.query('delete from akzii where id_akzii = $1', [id])
        res.json()
    }
}

module.exports = new AkziiController