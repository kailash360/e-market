const fs = require('fs')

const seller_home = (req, res) => {
    res.end(fs.readFileSync("./views/seller-home.html"))
}

module.exports = seller_home