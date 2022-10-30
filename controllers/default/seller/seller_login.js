const fs = require('fs')

const seller_login = (req, res) => {
    res.end(fs.readFileSync("./views/seller-login.html"))
}

module.exports = seller_login