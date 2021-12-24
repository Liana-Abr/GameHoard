const db = require('../../db.js')

class CategoryController{
    async createCategory(req, res){
        const{name_category} = req.body
        const category = await db.query('call category_insert($1)', [name_category])
        res.json()
    }
    async getAllCategory(req, res){
        const category = await db.query('select * from category')
        res.json(category.rows)
    }
    async getCategory(req, res){
        const id = req.params.id
        const category = await db.query('select * from category where id_category = $1', [id])
        res.json(category.rows[0])
    }
    async updateCategory(req, res){
        const {id_category, name_category} = req.body
        const category = await db.query('call category_update($1, $2)', [id_category, name_category])
        res.json()
    }
    async deleteCategory(req, res){
        const id = req.query.id
        const category = await db.query('delete from category where id_category = $1', [id])
        res.json()
    }
}

module.exports = new CategoryController