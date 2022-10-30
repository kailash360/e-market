require('dotenv').config()
const express = require("express")
const fs = require('fs')
const path = require("path")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const seller_auth = require("./middlewares/seller.auth");
const customer_auth = require("./middlewares/customer.auth");
const { response } = require("express");
const defaultControllers = require('./controllers/default')
const app = express()
const port = 5000;

//PostgreSQL
const client = require('./config/db.config');

//Setting source of static,javascripts,
// app.use('/views', express.static('views'))
app.use('/static', express.static('static'))
app.use('/scripts', express.static('scripts'))
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

app.use(function (req, res, next) {
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
app.get("/home", defaultControllers.home)

//Serving login page
app.get("/customer-login", defaultControllers.login_page)

//Logging in user
app.post("/verify-customer", defaultControllers.logging)

app.get("/invalid-login", defaultControllers.invalid_logging)

//Signing up user
app.post("/customer-sign-up", defaultControllers.sign_up)

//Serving signed-up page
app.get("/signed-up", defaultControllers.signed_up)

//Serving customer data
app.post("/customer-data", customer_auth, defaultControllers.data)

app.post("/update-customer-data", customer_auth, defaultControllers.update)

//Serving profile
app.get("/profile", defaultControllers.profile)

//Serving cart
app.get("/cart", defaultControllers.cart)

//Serving about
app.get("/about", defaultControllers.about)

//Serving products page
app.get("/products-page", defaultControllers.products_page)

//To display all the products to the customer
app.post("/products", customer_auth, defaultControllers.products)

//To add to the cart
app.post("/add-to-cart", customer_auth, defaultControllers.add_to_cart)

//Displaying products of cart to the customer
app.post("/cart-products", customer_auth, defaultControllers.cart_products)

//Deleting item from cart
app.post("/delete-from-cart", customer_auth, defaultControllers.delete_from_cart)

//Checkout
app.post("/checkout", customer_auth, defaultControllers.checkout)

//Finally buying the product
app.get('/payment', defaultControllers.payment)

//After making the payment
app.get('/purchased', defaultControllers.purchased)

//Serving history page
app.get("/history-page", defaultControllers.history_page)

//Fetching order history
app.post("/history", customer_auth, defaultControllers.history)

// For seller 
//Signing up the seller
app.post("/seller-signup", defaultControllers.seller_signup)

//Logging in seller
app.post("/verify-seller", defaultControllers.verify_seller)

//Serving seller data
app.post("/seller-data", seller_auth, defaultControllers.seller_data)

//Updating seller data
app.post("/update-seller-data", seller_auth, defaultControllers.seller_update)


//Serving login to seller
app.get("/seller-login", defaultControllers.seller_login)

//Serving signed up to seller
app.get("/seller-signed-up", defaultControllers.seller_signed_up)

//Serving home
app.get("/seller-home", defaultControllers.seller_home)

//Serving profile
app.get("/seller-profile", defaultControllers.seller_profile)

//Adding products of seller
app.post("/add-product", seller_auth, defaultControllers.add_products)

//Displaying the products to seller
app.post("/show-products", seller_auth, defaultControllers.show_products)

//Updating information of an item by seller
app.post("/update-item", seller_auth, defaultControllers.update_item)

//Deleting information of an item
app.post("/delete-item", seller_auth, defaultControllers.delete_item)

//Serving products to seller
app.get("/seller-products", defaultControllers.seller_products)

//Serving about to seller
app.get("/seller-about-us", defaultControllers.seller_about_us)


app.listen(process.env.PORT || port, () => {
    console.log(`Running on port ${process.env.PORT || port}`)
})