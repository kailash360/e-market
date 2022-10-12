const fs = require('fs')

const seller_signed_up = (req, res) => {
    res.end(fs.readFileSync("./views/seller-signed-up.html"))
}

module.exports = seller_signed_up