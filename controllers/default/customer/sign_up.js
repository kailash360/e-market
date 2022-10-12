const { Client } = require('pg');
//PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});
client.connect();

const sign_up = async (req, res) => {

    let registered = false;
    //Checking if user already exits
    const result = await client
        .query(`Select * from customers where username='${req.body.username}' OR email='${req.body.email}'`)
        .then(response => {
            if (response.rows.length > 0) {
                registered = true;
                res.statusCode = 402
                res.end()
            }
        })

    //If user does not exist, then insert into database
    if (!registered) {
        let hashed_pwd = await bcrypt.hash(req.body.password, 10)
        let sign_up_query = `insert into customers(user_fullname,username,email,contact_no,address_1,address_2,password,total_orders,total_supercoins) values ('${req.body.fullname}','${req.body.username}','${req.body.email}','${req.body.phone}','${req.body.add1}','${req.body.add2}','${hashed_pwd}',0,0)`
        client
            .query(sign_up_query)
            .then(response => {
                console.log(`Customer registered in the database successfully!`);
                res.statusCode = 200
                res.end()
            })
            .catch(err => {
                console.log(err)
                res.statusCode = 404
                res.end()
            })
    }
}

module.exports = sign_up