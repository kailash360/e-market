const fs = require('fs')

const seller_profile = (req, res) => {
    res.end(fs.readFileSync("./views/seller-profile.html"))
}

module.exports = seller_profile