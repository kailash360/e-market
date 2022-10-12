const { Client } = require('pg');
//PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});
client.connect();

const add_to_cart = async (req, res) => {

    //Adding to cart 
    let add_to_cart_query = `insert into customer_cart(username,product_name,product_price,product_quantity,product_info,seller_username) values('${req.locals.customer_username}','${req.body.name}','${req.body.price}','${req.body.quantity}','${req.body.info}','${req.body.seller_username}')`
    await client
        .query(add_to_cart_query)
        .then(response => {
            res.status = 200
            res.send()
            res.end()
        }).catch(err => {
            res.statusCode = 405
            res.send()
            res.end()
        })
}

module.exports = add_to_cart