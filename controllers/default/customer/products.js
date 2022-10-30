const { Client } = require('pg');
//PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});
client.connect();

const products = (req, res) => {
    let product_query = `select * from seller_products `

    //Only category
    if (req.body.type != "all" && req.body.price == "10000" && req.body.search == "") {
        product_query = product_query.concat(`where product_category='${req.body.type}' `)
    }

    //Only price
    if (req.body.price != "10000" && req.body.type == "all" && req.body.search == "") {
        let price = parseInt(req.body.price)
        product_query = product_query.concat(`where product_price<${price}`)
    }

    //Both price and category
    if (req.body.price != "10000" && req.body.type != "all" && req.body.search == "") {
        let price = parseInt(req.body.price)
        product_query = product_query.concat(`where product_price<${price} and product_category='${req.body.type}'`)
    }

    //Only name
    if (req.body.type == "all" && req.body.price == "10000" && req.body.search != "") {
        product_query = product_query.concat(`where product_name like'%${req.body.search}%' `)
    }

    //Only Price and name
    if (req.body.price != "10000" && req.body.type == "all" && req.body.search != "") {
        let price = parseInt(req.body.price)
        product_query = product_query.concat(`where product_price<${price} and product_name like'%${req.body.search}%' `)
    }

    //Only category and name
    if (req.body.price == "10000" && req.body.type != "all" && req.body.search != "") {
        let price = parseInt(req.body.price)
        product_query = product_query.concat(`where product_category='${req.body.type}' and product_name like'%${req.body.search}%' `)
    }

    //All category,name and item
    if (req.body.price != "10000" && req.body.type != "all" && req.body.search != "") {
        let price = parseInt(req.body.price)
        product_query = product_query.concat(`where product_price<${price} and product_category='${req.body.type}' and product_name like'%${req.body.search}%' `)
    }

    product_query += ' order by product_name'
    client.query(product_query)
        .then(response => {
            if (response.rows.length > 0) {
                res.statusCode = 200
                res.send(response.rows)
                res.end()
            } else {
                res.statusCode = 404
                res.end()
            }
        })
}

module.exports = products