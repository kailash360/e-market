const { Client } = require('pg');
//PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});
client.connect();

const seller_data = async (req, res) => {
    client
        .query(`select * from sellers where username='${req.locals.seller_username}'`)
        .then(response => {
            res.send(response.rows)
            res.end()
        })
}

module.exports = seller_data