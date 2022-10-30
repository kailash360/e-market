const fs = require('fs')

const about = (req, res) => {
    res.end(fs.readFileSync(__dirname + "/../../../views/about.html"))
}

module.exports = about