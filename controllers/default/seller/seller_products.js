const fs = require('fs')

const seller_products = (req, res) => {
    res.end(fs.readFileSync("./views/seller-products.html"))
}

module.exports = seller_products