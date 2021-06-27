const jwt = require('jsonwebtoken');
const { Client } = require('pg');
require('dotenv').config()

//PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});
client.connect();

//Authenticating token from seller
const seller_auth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const username = decodedToken.username;
        req.locals = { 'seller_username': username }
        await client
            .query(`select * from sellers where username='${username}'`)
            .then(response => {
                if (response.rows.length == 0) {
                    throw 'Invalid user ID';
                } else {
                    next();
                }
            })
    } catch {
        err => {
            console.log(err)
            res.status(401).json({
                error: new Error('Invalid request!')
            });
        }
    }

};

const customer_auth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const username = decodedToken.username;
        req.locals = { 'customer_username': username }
        await client
            .query(`select * from customers where username='${username}'`)
            .then(response => {
                if (response.rows.length == 0) {
                    throw 'Invalid user ID';
                } else {
                    next();
                }
            })
    } catch {
        err => {
            console.log(err)
            res.status(401).json({
                error: new Error('Invalid request!')
            });
        }
    }

};

module.exports = {
    'seller_auth': seller_auth,
    'customer_auth': customer_auth,
}