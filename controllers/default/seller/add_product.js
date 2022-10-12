const { Client } = require('pg');
//PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});
client.connect();

const add_product = async (req, res) => {
    client
        .query(`insert into seller_products(username,product_name,product_price,product_quantity,product_info,product_category) values ('${req.locals.seller_username}','${req.body.item_name}','${req.body.item_price}','${req.body.item_quantity}','${req.body.item_data}','${req.body.item_category}')`)
        .then(response => {
            res.statusCode = 201
            res.end()
        }).catch(err => {
            console.log(err)
            res.statusCode = 404
            res.end()
        })
}

module.exports = add_product