const { Client } = require('pg');
//PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});
client.connect();

const update_item = async (req, res) => {
    client
        .query(`update seller_products set product_price='${parseInt(req.body.price)}',product_quantity='${parseInt(req.body.quantity)}',product_info='${req.body.data}' where (username='${req.locals.seller_username}' AND product_name='${req.body.name}');commit;`)
        .then(response => {
            res.ok = true
            res.end()
        }).catch(err => {
            console.log(err)
            res.statusCode = 404
            res.end()
        })
}

module.exports = update_item