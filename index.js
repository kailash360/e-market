const express = require("express")
const { Client } = require('pg');
const fs = require('fs')
const path = require("path")
const bodyparser = require("body-parser")
const bcrypt = require("bcrypt")
const app = express()
require('dotenv').config()
const hostname = '127.0.0.1';
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
app.use('/static', express.static('static'))
app.use('/scripts', express.static('scripts'))
app.use(express.urlencoded())

//Setting source of html files 
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

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
app.post("/customer-logging", async(req, res) => {
    let search_query = `select * from customers where (email='${req.body.username}' OR username='${req.body.username}')`
    client
        .query(search_query)
        .then(response => {
            //Matching passwords
            bcrypt.compare(req.body.password, response.rows[0].password, function(err, result) {
                console.log(result)
                if (result != true) {
                    res.end(fs.readFileSync("./views/invalid-login.html"))
                } else {
                    res.end(fs.readFileSync("./views/profile.html"))
                }
            })
        })
})

//Signing up user
app.post("/customer-sign-up", async(req, res) => {

    //Checking if user already exits
    const result = await client
        .query(`Select * from customers where username='${req.body.username}'`)
        .then(response => {
            if (response.rows.length > 0) {
                res.send({ message: "Username already exists" })
            }
        })

    //If user does not exist, then insert into database
    let hashed_pwd = await bcrypt.hash(req.body.password, 10)
    let sign_up_query = `insert into customers(email,username,password) values ('${req.body.email}','${req.body.username}','${hashed_pwd}')`
    client
        .query(sign_up_query)
        .then(response => {
            console.log(`${req.body} registered in the database successfully!`);
            res.end(fs.readFileSync("./views/signed-up.html"))
        })
        .catch(err => {
            console.error(err);
        });
})

//Serving profile
app.get("/", (req, res) => {
    res.end(fs.readFileSync("./views/home.html"))
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


// For seller 
//Signing up the seller
app.post("/seller-sign-up", async(req, res) => {

    //Checking if user already exits
    const result = await client
        .query(`Select * from sellers where username='${req.body.username}'`)
        .then(response => {
            if (response.rows.length > 0) {
                res.send({ message: "Username already exists" })
            }
        })

    //If user does not exist, then insert into database
    let hashed_pwd = await bcrypt.hash(req.body.password, 10)
    let sign_up_query = `insert into sellers(email,username,password) values ('${req.body.email}','${req.body.username}','${hashed_pwd}')`
    client
        .query(sign_up_query)
        .then(response => {
            // console.log(`${req.body} registered in the database successfully!`);
            res.end(fs.readFileSync("./views/seller-signed-up.html"))
        })
        .catch(err => {
            console.error(err);
        });
})

//Logging in seller
app.post("/seller-logging", async(req, res) => {
    let search_query = `select * from sellers where (email='${req.body.username}' OR username='${req.body.username}')`
    client
        .query(search_query)
        .then(response => {
            //Matching passwords
            bcrypt.compare(req.body.password, response.rows[0].password, function(err, result) {
                if (result != true) {
                    res.end(fs.readFileSync("./views/invalid-login.html"))
                } else {
                    res.end(fs.readFileSync("./views/seller-profile.html"))
                }
            })
        })
})

//Serving login to seller
app.get("/seller-login", (req, res) => {
    res.end(fs.readFileSync("./views/seller-login.html"))
})

//Serving profile
app.get("/seller-profile", (req, res) => {
    res.end(fs.readFileSync("./views/seller-profile.html"))
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