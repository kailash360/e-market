const fs = require('fs')

const history_page = (req, res) => {
    res.end(fs.readFileSync(__dirname + "/../../../views/customer_history.html"))
}

module.exports = history_page