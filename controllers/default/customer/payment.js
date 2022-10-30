const fs = require('fs')

const payment = (req, res) => {
    res.end(fs.readFileSync(__dirname + "/../../../views/payment.html"))
}

module.exports = payment