const express = require("express")
const { Client } = require('pg');
const fs = require('fs')
const path = require("path")
const bodyparser = require("body-parser")
const app = express()
const hostname = '127.0.0.1';
const port = 80;

//PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    user: 'gzdhpxgojwvlyv',
    host: 'ec2-52-0-114-209.compute-1.amazonaws.com',
    database: 'd7fmtdqnohercb',
    password: '8272c821e2c98357afe7cb18d6279f28626a9875d442a3a47e27222bfe5494e8',
    port: 5432,
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
    let search_query = `select * from customers where (email='${req.body.username}' OR username='${req.body.username}') AND password='${req.body.password}'`
    client
        .query(search_query)
        .then(response => {
            if (response.rows.length == 0) {
                res.end(fs.readFileSync("./views/invalid-login.html"))
            } else {
                res.end(fs.readFileSync("./views/profile.html"))
            }
        })
})

//Signing up user
app.post("/customer-sign-up", (req, res) => {

    let sign_up_query = `insert into customers(email,username,password) values ('${req.body.email}','${req.body.username}','${req.body.password}')`
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
app.post("/seller-sign-up", (req, res) => {
    let sign_up_query = `insert into sellers(email,username,password) values ('${req.body.email}','${req.body.username}','${req.body.password}')`
    client
        .query(sign_up_query)
        .then(response => {
            console.log(`${req.body} registered in the database successfully!`);
            res.end(fs.readFileSync("./views/seller-signed-up.html"))
        })
        .catch(err => {
            console.error(err);
        });
})

//Logging in seller
app.post("/seller-logging", async(req, res) => {
    let search_query = `select * from sellers where (email='${req.body.username}' OR username='${req.body.username}') AND password='${req.body.password}'`
    client
        .query(search_query)
        .then(response => {
            if (response.rows.length == 0) {
                res.end(fs.readFileSync("./views/invalid-login.html"))
            } else {
                res.end(fs.readFileSync("./views/seller-profile.html"))
            }
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