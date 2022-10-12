const { Client } = require('pg');
//PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});
client.connect();

const data = async (req, res) => {
    client
        .query(`select * from customers where username='${req.locals.customer_username}'`)
        .then(response => {
            res.send(response.rows)
            res.end()
        }).catch(err => {
            console.log(err)
            res.statusCode = 404
            res.end()
        })
}

module.exports = data