const fs = require('fs')

const products_page = (req, res) => {
    res.end(fs.readFileSync(__dirname + "/../../../views/product.html"))
}

module.exports = products_page