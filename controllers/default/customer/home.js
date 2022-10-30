const fs = require('fs')

const home = (req, res) => {
    res.end(fs.readFileSync(__dirname + "/../../../views/index.html"))
}

module.exports = home