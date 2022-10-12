const { Client } = require('pg');
//PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});
client.connect();

const logging = async (req, res) => {
    let search_query = `select * from customers where (email='${req.body.username}' OR username='${req.body.username}')`
    await client
        .query(search_query)
        .then(response => {
            //Checking if user is present
            if (response.rows.length == 0) {
                res.statusCode = 403
                res.end()
            } else {
                //Checking if password is correct
                bcrypt.compare(req.body.password, response.rows[0].password, function (err, result) {
                    if (result != true) {
                        res.statusCode = 403
                        res.end()
                    } else {
                        jwt.sign({ 'username': req.body.username }, process.env.JWT_KEY, function (err, tokenId) {
                            if (err) {
                                console.log(err)
                                res.statusCode = 400
                                res.end()
                                return
                            }
                            res.json(JSON.stringify(`{"token":"${tokenId}"}`));
                            res.end()
                        })
                    }
                })
            }
        })
}

module.exports = logging