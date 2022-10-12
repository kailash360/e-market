const { Client } = require('pg');
//PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});
client.connect();

const seller_signup = async (req, res) => {

    let registered = false;
    //Checking if user already exits
    const result = await client
        .query(`Select * from sellers where username='${req.body.username}' OR email='${req.body.email}'`)
        .then(response => {
            if (response.rows.length > 0) {
                registered = true;
                res.statusCode = 402
                res.end()
            }
        }).catch(err => {
            console.log(err)
            res.statusCode = 404
            res.end()
        })

    //If user does not exist, then insert into database
    if (!registered) {
        let hashed_pwd = await bcrypt.hash(req.body.password, 10)
        let sign_up_query = `insert into sellers(business_name,username,email,contact_no,office_address,home_address,password,total_revenue,total_orders) values ('${req.body.business_name}','${req.body.username}','${req.body.email}','${req.body.phone}','${req.body.office_add}','${req.body.home_add}','${hashed_pwd}',0,0)`
        client
            .query(sign_up_query)
            .then(response => {
                console.log(`Seller registered in the database successfully!`);
                res.statusCode = 200
                res.end()
            })
            .catch(err => {
                console.error(err);
                res.end()
            });
    }
}

module.exports = seller_signup