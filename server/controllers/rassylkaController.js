const db = require('../../db.js')
const nodemailer = require("nodemailer");

class RassylkaController {
    async createRassylka(req, res) {
        const { email_rassylka } = req.body;
        const { url } = req.query;
        const rassylka = await db.query('call rassylka_insert($1)', [email_rassylka]);
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SENDEMAIL,
                    pass: process.env.SENDPASS
                }
            });
            const mailOptions = {
                from: process.env.SENDEMAIL,
                to: email_rassylka,
                subject: 'HELLO EMAIL WORLD',
                text: 'Hello to myself!',
                html: `<!doctype html>
                <html ⚡4email>
        
                    <head>
                    <meta charset="utf-8">
                    <style amp4email-boilerplate>body{visibility:hidden}</style>
                    <script async src="https://cdn.ampproject.org/v0.js"></script>
                    <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
                    <style>
                        body{
                            color: #00000070;
                        }
                    </style>
                    </head>
        
                    <body>
                    Здравствуйте, <b>${email_rassylka}</b>!
                    
                    Спасибо, что подписались на рассылку!
                    Теперь мы будем уведомлять вас о распродажах и скидках на популярные товары!
        
                    Это письмо было отправлено автоматически. Пожалуйста, <b>не отвечайте на него</b>.
        
                    С наилудшими пожеланиями,
                    <b>GameHoard</b>.
                    </body>
        
                </html>`
            };
            transporter.sendMail(mailOptions);
            res.redirect(`${url}`);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async getAllRassylka(req, res) {
        const rassylka = await db.query('select * from rassylka')
        res.json(rassylka.rows)
    }
    async getRassylka(req, res) {
        const id = req.params.id
        const rassylka = await db.query('select * from rassylka where id_rassylka = $1', [id])
        res.json(rassylka.rows[0])
    }
    async updateRassylka(req, res) {
        try {
            const { id_rassylka, email_rassylka } = req.body
            const rassylka = await db.query('call rassylka_update($1, $2)', [id_rassylka, email_rassylka])
            res.redirect('/admin/rassylka')
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async deleteRassylka(req, res) {
        try {
            const id = req.body.id
            const rassylka = await db.query('delete from rassylka where id_rassylka = $1', [id])
            res.redirect('/admin/rassylka');
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = new RassylkaController