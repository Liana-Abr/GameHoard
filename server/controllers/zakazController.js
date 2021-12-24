const db = require('../../db.js')

class ZakazController{
    async createZakaz(req, res){
        const{first_name_zakaz, last_name_zakaz, email_zakaz, phone_zakaz, date_zakaz, itog_stoimost_zakaz, akzii_ID, adress_zakaz, sposob_oplaty_id} = req.body
        const zakaz = await db.query('call zakaz_insert($1, $2, $3, $4, $5, $6, $7, $8, $9)', [first_name_zakaz, last_name_zakaz, email_zakaz, phone_zakaz, date_zakaz, itog_stoimost_zakaz, akzii_ID, adress_zakaz, sposob_oplaty_id])
        res.json()
    }
    async getAllZakaz(req, res){
        const zakaz = await db.query('select * from zakaz')
        res.json(zakaz.rows)
    }
    async getZakaz(req, res){
        const id = req.params.id
        const zakaz = await db.query('select * from zakaz where id_zakaz = $1', [id])
        res.json(zakaz.rows[0])
    }
    async updateZakaz(req, res){
        const {id_zakaz, first_name_zakaz, last_name_zakaz, email_zakaz, phone_zakaz, date_zakaz, itog_stoimost_zakaz, akzii_ID, adress_zakaz, sposob_oplaty_id} = req.body
        const zakaz = await db.query('call zakaz_update($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [id_zakaz, first_name_zakaz, last_name_zakaz, email_zakaz, phone_zakaz, date_zakaz, itog_stoimost_zakaz, akzii_ID, adress_zakaz, sposob_oplaty_id])
        res.json()
    }
    async deleteZakaz(req, res){
        const id = req.query.id
        const zakaz = await db.query('delete from zakaz where id_zakaz = $1', [id])
        res.json()
    }
}

module.exports = new ZakazController