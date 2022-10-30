const fs = require('fs')

const signed_up = (req, res) => {
    res.end(fs.readFileSync(__dirname + "/../../../views/signed-up.html"))
}

module.exports = signed_up