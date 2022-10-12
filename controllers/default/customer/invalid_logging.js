const fs = require('fs')

const invalid_logging = (req, res) => {
    res.end(fs.readFileSync(__dirname + "/../../../views/invalid-login.html"))
}

module.exports = invalid_logging