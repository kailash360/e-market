const fs = require('fs')

const purchased = (req, res) => {
    res.end(fs.readFileSync(__dirname + "/../../../views/thank-you.html"))
}

module.exports = purchased