const fs = require('fs')

const cart = (req, res) => {
    res.end(fs.readFileSync(__dirname + "/../../../views/cart.html"))
}

module.exports = cart