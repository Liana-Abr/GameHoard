const db = require('../../db.js')

class IzdatelController{
    async createIzdatel(req, res){
        const{name_izdatel} = req.body
        const izdatel = await db.query('call izdatel_insert($1)', [name_izdatel])
        res.json()
    }
    async getAllIzdatel(req, res){
        const izdatel = await db.query('select * from izdatel')
        res.json(izdatel.rows)
    }
    async getIzdatel(req, res){
        const id = req.params.id
        const izdatel = await db.query('select * from izdatel where id_izdatel = $1', [id])
        res.json(izdatel.rows[0])
    }
    async updateIzdatel(req, res){
        const {id_izdatel, name_izdatel} = req.body
        const izdatel = await db.query('call izdatel_update($1, $2)', [id_izdatel, name_izdatel])
        res.json()
    }
    async deleteIzdatel(req, res){
        const id = req.query.id
        const izdatel = await db.query('delete from izdatel where id_izdatel = $1', [id])
        res.json()
    }
}

module.exports = new IzdatelController