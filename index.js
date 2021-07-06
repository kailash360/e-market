require('dotenv').config()
const express = require("express")
const { Client } = require('pg');
const fs = require('fs')
const path = require("path")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const seller_auth = require("./middleware").seller_auth;
const customer_auth = require("./middleware").customer_auth;
const { response } = require("express");
const app = express()
const port = 80;

//PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});
client.connect();

//Setting source of static,javascripts,
// app.use('/views', express.static('views'))
app.use('/static', express.static('static'))
app.use('/scripts', express.static('scripts'))
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Setting source of html files 
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

//Serving landing page
app.get("/", (req, res) => {
    res.end(fs.readFileSync("./views/index.html"))
})

// For customer 
//Serving home
app.get("/home", (req, res) => {
    res.end(fs.readFileSync("./views/home.html"))
})

//Serving login page
app.get("/customer-login", (req, res) => {
    res.end(fs.readFileSync("./views/customer-login.html"))
})

//Logging in user
app.post("/verify-customer", async(req, res) => {
    let search_query = `select * from customers where (email='${req.body.username}' OR username='${req.body.username}')`
    await client
        .query(search_query)
        .then(response => {
            //Checking if user is present
            if (response.rows.length == 0) {
                res.statusCode = 403
                res.end()
            } else {
                //Checking if password is correct
                bcrypt.compare(req.body.password, response.rows[0].password, function(err, result) {
                    if (result != true) {
                        res.statusCode = 403
                        res.end()
                    } else {
                        jwt.sign({ 'username': req.body.username }, process.env.JWT_KEY, function(err, tokenId) {
                            if (err) {
                                console.log(err)
                                res.statusCode = 400
                                res.end()
                                return
                            }
                            res.json(JSON.stringify(`{"token":"${tokenId}"}`));
                            res.end()
                        })
                    }
                })
            }
        })
})

app.get("/invalid-login", (req, res) => {
    res.end(fs.readFileSync("./views/invalid-login.html"))
})

//Signing up user
app.post("/customer-sign-up", async(req, res) => {

    let registered = false;
    //Checking if user already exits
    const result = await client
        .query(`Select * from customers where username='${req.body.username}' OR email='${req.body.email}'`)
        .then(response => {
            if (response.rows.length > 0) {
                registered = true;
                res.statusCode = 402
                res.end()
            }
        })

    //If user does not exist, then insert into database
    if (!registered) {
        let hashed_pwd = await bcrypt.hash(req.body.password, 10)
        let sign_up_query = `insert into customers(user_fullname,username,email,contact_no,address_1,address_2,password) values ('${req.body.fullname}','${req.body.username}','${req.body.email}','${req.body.phone}','${req.body.add1}','${req.body.add2}','${hashed_pwd}')`
        client
            .query(sign_up_query)
            .then(response => {
                console.log(`Customer registered in the database successfully!`);
                res.statusCode = 200
                res.end()
            })
            .catch(err => {
                console.log(err)
                res.statusCode = 404
                res.end()
            })
    }
})

//Serving signed-up
app.get("/signed-up", (req, res) => {
    res.end(fs.readFileSync("./views/signed-up.html"))
})

//Serving customer data
app.post("/customer-data", customer_auth, async(req, res) => {
    client
        .query(`select * from customers where username='${req.locals.customer_username}'`)
        .then(response => {
            res.send(response.rows)
            res.end()
        }).catch(err => {
            console.log(err)
            res.statusCode = 404
            res.end()
        })
})

app.post("/update-customer-data", customer_auth, async(req, res) => {
    client
        .query(`update customers set user_fullname='${req.body.userFullName}',email='${req.body.userEmail}',contact_no='${req.body.userPhone}',address_1='${req.body.userAdd1}',address_2='${req.body.userAdd2}' where username='${req.locals.customer_username}'`)
        .then(response => {
            res.end()
        }).catch(err => {
            console.log(err)
            res.statusCode = 401
            res.end()
        })
})

//Serving profile
app.get("/profile", (req, res) => {
    res.end(fs.readFileSync("./views/profile.html"))
})

//Serving cart
app.get("/cart", (req, res) => {
    res.end(fs.readFileSync("./views/cart.html"))
})

//Serving about
app.get("/about", (req, res) => {
    res.end(fs.readFileSync("./views/about.html"))
})

//Serving products page
app.get("/products-page", (req, res) => {
    res.end(fs.readFileSync("./views/product.html"))
})

//To display all the products to the customer
app.post("/products", customer_auth, (req, res) => {
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
})

//To add to the cart
app.post("/add-to-cart", customer_auth, async(req, res) => {

    //Adding to cart 
    let add_to_cart_query = `insert into customer_cart(username,product_name,product_price,product_quantity,product_info) values('${req.locals.customer_username}','${req.body.name}','${req.body.price}','${req.body.quantity}','${req.body.info}')`
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
})

//Displaying products of cart to the customer
app.post("/cart-products", customer_auth, async(req, res) => {
    let query = `select * from customer_cart where username='${req.locals.customer_username}'`
    client
        .query(query)
        .then(response => {
            res.send(response.rows)
            res.end()
        })
})

//Deleting item from cart
app.post("/delete-from-cart", customer_auth, async(req, res) => {
    let delete_query = `delete from customer_cart where username='${req.locals.customer_username}' and product_name='${req.body.name}'`
    client
        .query(delete_query)
        .then(response => {
            res.status = 200
            res.send()
            res.end()
        })
})

//Finally buying the product
app.get('/purchased', (req, res) => {
    res.end(fs.readFileSync("./views/thank-you.html"))
})



// For seller 
//Signing up the seller
app.post("/seller-signup", async(req, res) => {

    let registered = false;
    //Checking if user already exits
    const result = await client
        .query(`Select * from sellers where username='${req.body.username}' OR email='${req.body.email}'`)
        .then(response => {
            if (response.rows.length > 0) {
                registered = true;
                res.statusCode = 402
                res.end()
            }
        }).catch(err => {
            console.log(err)
            res.statusCode = 404
            res.end()
        })

    //If user does not exist, then insert into database
    if (!registered) {
        let hashed_pwd = await bcrypt.hash(req.body.password, 10)
        let sign_up_query = `insert into sellers(business_name,username,email,contact_no,office_address,home_address,password) values ('${req.body.business_name}','${req.body.username}','${req.body.email}','${req.body.phone}','${req.body.office_add}','${req.body.home_add}','${hashed_pwd}')`
        client
            .query(sign_up_query)
            .then(response => {
                console.log(`Seller registered in the database successfully!`);
                res.statusCode = 200
                res.end()
            })
            .catch(err => {
                console.error(err);
                res.end()
            });
    }
})

//Logging in seller
app.post("/verify-seller", async(req, res) => {
    let search_query = `select * from sellers where (email='${req.body.username}' OR username='${req.body.username}')`
    await client
        .query(search_query)
        .then(response => {
            //Checking if user is present
            if (response.rows.length == 0) {
                res.statusCode = 403
                res.end()
            } else {
                //Checking if password is correct
                bcrypt.compare(req.body.password, response.rows[0].password, function(err, result) {
                    if (result != true) {
                        res.statusCode = 403
                        res.end()
                    } else {
                        jwt.sign({ 'username': req.body.username }, process.env.JWT_KEY, { expiresIn: '2h' }, function(err, tokenId) {
                            if (err) {
                                console.log(err)
                                res.statusCode = 400
                                res.end()
                                return
                            }
                            res.json(JSON.stringify(`{"token":"${tokenId}"}`));
                            res.end()
                        })
                    }
                })
            }
        })
})

//Serving seller data
app.post("/seller-data", seller_auth, async(req, res) => {
    client
        .query(`select * from sellers where username='${req.locals.seller_username}'`)
        .then(response => {
            res.send(response.rows)
            res.end()
        })
})

//Updating seller data
app.post("/update-seller-data", seller_auth, async(req, res) => {
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
})


//Serving login to seller
app.get("/seller-login", (req, res) => {
    res.end(fs.readFileSync("./views/seller-login.html"))
})

//Serving login to seller
app.get("/seller-signed-up", (req, res) => {
    res.end(fs.readFileSync("./views/seller-signed-up.html"))
})

//Serving home
app.get("/seller-home", (req, res) => {
    res.end(fs.readFileSync("./views/seller-home.html"))
})

//Serving profile
app.get("/seller-profile", (req, res) => {
    res.end(fs.readFileSync("./views/seller-profile.html"))
})

//Adding products of seller
app.post("/add-product", seller_auth, async(req, res) => {
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
})

//Displaying the products to seller
app.post("/show-products", seller_auth, async(req, res) => {
    client
        .query(`select * from seller_products where username='${req.locals.seller_username}'`)
        .then(response => {
            res.send(response.rows)
            res.end()
        }).catch(err => {
            console.log(err)
            res.statusCode = 404
            res.end()
        })
})

//Updating information of an item
app.post("/update-item", seller_auth, async(req, res) => {
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
})

//Deleting information of an item
app.post("/delete-item", seller_auth, async(req, res) => {
    client
        .query(`delete from seller_products where product_price='${parseInt(req.body.price)}'and product_quantity='${parseInt(req.body.quantity)}' and product_info='${req.body.data}' and username='${req.locals.seller_username}' AND product_name='${req.body.name}';commit;`)
        .then(response => {
            res.ok = true
            res.end()
        }).catch(err => {
            console.log(err)
            res.statusCode = 404
            res.end()
        })
})

//Serving products to seller
app.get("/seller-products", (req, res) => {
    res.end(fs.readFileSync("./views/seller-products.html"))
})

//Serving about to seller
app.get("/seller-about-us", (req, res) => {
    res.end(fs.readFileSync("./views/seller-about-us.html"))
})


app.listen(process.env.PORT || port)