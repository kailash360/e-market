const fs = require('fs')

const seller_about_us = (req, res) => {
    res.end(fs.readFileSync("./views/seller-about-us.html"))
}

module.exports = seller_about_us