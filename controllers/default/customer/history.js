const { Client } = require('pg');
//PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});
client.connect();

const history = (req, res) => {
    let customer_history = `select * from customer_history where username='${req.locals.customer_username}'`
    client
        .query(customer_history)
        .then(response => {
            console.log(response.rows)
            res.send(response.rows)
            res.end()
        })
}

module.exports = history