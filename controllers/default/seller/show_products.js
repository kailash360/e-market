const { Client } = require('pg');
//PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});
client.connect();

const show_products = async (req, res) => {
    client
        .query(`select * from seller_products where username='${req.locals.seller_username}' order by product_name`)
        .then(response => {
            res.send(response.rows)
            res.end()
        }).catch(err => {
            console.log(err)
            res.statusCode = 404
            res.end()
        })
}

module.exports = show_products