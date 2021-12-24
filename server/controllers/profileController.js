const db = require('../../db.js')

class ProfileController{
    async createProfile(req, res){
        const{first_name_profile, last_name_profile, email_profile, phone_profile, password_profile} = req.body
        const profile = await db.query('call profile_insert($1, $2, $3, $4, $5)', [first_name_profile, last_name_profile, email_profile, phone_profile, password_profile])
        res.json()
    }
    async getAllProfile(req, res){
        const {email_profile, phone_profile, password_profile} = req.query
        let a = ''
        const arr = []
        if(email_profile){
            arr.push(`email_profile = ${email_profile}`)
        }
        if(phone_profile){
            arr.push(`phone_profile = ${phone_profile}`)
        }
        if(password_profile){
            arr.push(`password_profile = ${password_profile}`)
        }
        if(arr.length > 0){
            a = `where ${arr.join(' and ')}`
        }
        const profile = await db.query(`select * from profile ${a}`)
        res.json(profile.rows)
    }
    async getProfile(req, res){
        const id = req.params.id
        const profile = await db.query('select * from profile where id_profile = $1', [id])
        res.json(profile.rows[0])
    }
    async updateProfile(req, res){
        const {id_profile, first_name_profile, last_name_profile, email_profile, phone_profile, password_profile} = req.body
        const profile = await db.query('call profile_update($1, $2, $3, $4, $5, $6)', [id_profile, first_name_profile, last_name_profile, email_profile, phone_profile, password_profile])
        res.json()
    }
    async deleteProfile(req, res){
        const id = req.query.id
        const profile = await db.query('delete from profile where id_profile = $1', [id])
        res.json()
    }
}

module.exports = new ProfileController