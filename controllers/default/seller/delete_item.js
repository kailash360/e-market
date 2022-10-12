const { Client } = require('pg');
//PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});
client.connect();

const delete_item = async (req, res) => {
    client
        .query(`delete from seller_products where username='${req.locals.seller_username}' AND product_name='${req.body.name}';commit;`)
        .then(response => {
            res.ok = true
            res.end()
        }).catch(err => {
            console.log(err)
            res.statusCode = 404
            res.end()
        })
}

module.exports = delete_item