const fs = require('fs')
const { Client } = require('pg');
//PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});
client.connect();

const update = async (req, res) => {
    client
        .query(`update customers set user_fullname='${req.body.userFullName}',email='${req.body.userEmail}',contact_no='${req.body.userPhone}',address_1='${req.body.userAdd1}',address_2='${req.body.userAdd2}' where username='${req.locals.customer_username}'`)
        .then(response => {
            res.end()
        }).catch(err => {
            console.log(err)
            res.statusCode = 401
            res.end()
        })
}

module.exports = update