const { Client } = require('pg');
//PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});
client.connect();

const seller_update = async (req, res) => {
    client
        .query(`update sellers set business_name='${req.body.userBusinessName}',email='${req.body.userEmail}',contact_no='${req.body.userPhone}',office_address='${req.body.office_add}',home_address='${req.body.home_add}' where username='${req.locals.seller_username}'`)
        .then(response => {
            res.end()
        }).catch(err => {
            console.log(err)
            res.statusCode = 401
            res.message = err
            res.end()
        })
}

module.exports = seller_update