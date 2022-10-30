const fs = require('fs')

const profile = (req, res) => {
    res.end(fs.readFileSync(__dirname + "/../../../views/profile.html"))
}

module.exports = profile