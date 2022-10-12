const fs = require('fs')

const login_page = (req, res) => {
    res.end(fs.readFileSync(__dirname + "/../../../views/customer-login.html"))
}

module.exports = login_page