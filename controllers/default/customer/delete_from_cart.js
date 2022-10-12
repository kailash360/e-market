const { Client } = require('pg');
//PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});
client.connect();

const delete_from_cart = async (req, res) => {
    let delete_query = `delete from customer_cart where username='${req.locals.customer_username}' and product_name='${req.body.name}'`
    client
        .query(delete_query)
        .then(response => {
            res.status = 200
            res.send()
            res.end()
        })
}

module.exports = delete_from_cart