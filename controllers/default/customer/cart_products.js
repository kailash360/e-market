const { Client } = require('pg');
//PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});
client.connect();

const cart_products = async (req, res) => {
    let query = `select * from customer_cart where username='${req.locals.customer_username}' order by product_name`
    client
        .query(query)
        .then(response => {
            res.send(response.rows)
            res.end()
        })
}

module.exports = cart_products