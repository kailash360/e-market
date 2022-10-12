const { Client } = require('pg');
//PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});
client.connect();

const checkout = (req, res) => {
    console.log(req.body)

    //Add to order history
    let date = new Date()
    let d = date.getDate()
    let m = date.getMonth() + 1
    let y = date.getFullYear()

    let curr_date = y + "-" + m + "-" + d
    console.log(curr_date)
    for (i in req.body.product_name_list) {
        let order_history_query = `insert into customer_history(username,product_name,quantity,price,date_of_purchase) values ('${req.locals.customer_username}','${req.body.product_name_list[i]}',${parseInt(req.body.product_quantity_list[i])},${req.body.product_price_list[i]},'${curr_date}')`
        console.log(order_history_query)
        client.query(order_history_query)
    }

    //Remove the items from cart
    let delete_from_cart_query = `delete from customer_cart where username='${req.locals.customer_username}'`
    client.query(delete_from_cart_query)

    //Update products' database when products are purchased
    for (i in req.body.product_name_list) {
        let update_products_query = `update seller_products set product_quantity=product_quantity-${req.body.product_quantity_list[i]} where product_name='${req.body.product_name_list[i]}'`
        client.query(update_products_query)
    }

    //Update customer data after purchasing
    let order_update_query = `update customers set total_orders=total_orders+1 where username='${req.locals.customer_username}'`
    client.query(order_update_query)

    //Update number of supercoins if amount>500 
    let supercoin_update_query = `update customers set total_supercoins=total_supercoins+1 where username='${req.locals.customer_username}'`
    if (parseInt(req.body.sum) >= 500) {
        client.query(supercoin_update_query)
    }

    //Update seller data on purchase
    for (i in req.body.seller_list) {
        let seller_update_query = `update sellers set total_orders=total_orders+1,total_revenue=total_revenue+${req.body.seller_amount_list[i]} where username='${req.body.seller_list[i]}'`
        client.query(seller_update_query)
    }


    client.query("update seller_products set product_quantity=0 where product_quantity<0")
    res.end()
}

module.exports = checkout