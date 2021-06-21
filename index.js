const express = require("express")
const fs = require('fs')
const path = require("path")
const bodyparser = require("body-parser")
const app = express()
const hostname = '127.0.0.1';
const port = 80;

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
//Serving profile
app.get("/seller-profile", (req, res) => {
    res.end(fs.readFileSync("./views/seller-profile.html"))
})

//Serving products to seller
app.get("/seller-products", (req, res) => {
    res.end(fs.readFileSync("./views/seller-products.html"))
})


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});