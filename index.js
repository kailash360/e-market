const express = require("express")
const { Client } = require('pg');
const fs = require('fs')
const path = require("path")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const app = express()
require('dotenv').config()
const hostname = '127.0.0.1';
const port = 80;

//PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});
client.connect();

//Setting source of static,javascripts,
// app.use('/views', express.static('views'))
app.use('/static', express.static('static'))
app.use('/scripts', express.static('scripts'))
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//Setting source of html files 
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

//Function to authenticate token
// function authenticationMiddleware(request, response, nextHandler) {
//     const accessToken = getAccessTokenFromHeader(request);

//     try {
//         const tokenPayload = jwt.verify(accessToken, JWT_KEY);
//         if (tokenPayload.type !== 'access') {
//             throw new Error('wrong token type');
//         }
//         // new
//         response.locals.user = tokenPayload;
//         nextHandler();
//     } catch (error) {
//         response.status(401).send(error.message);
//     }
// }


// let checkToken = (req, res, next) => {
//     let token = String(req.headers['x-access-token'] || req.headers['authorization']); // Express headers are auto converted to lowercase
//     if (token.startsWith('Bearer ')) {
//         // Remove Bearer from string
//         token = token.slice(7, token.length);
//     }

//     if (token) {
//         jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
//             if (err) {
//                 return res.json({
//                     success: false,
//                     message: 'Token is not valid'
//                 });
//             } else {
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//     } else {
//         return res.json({
//             success: false,
//             message: 'Auth token is not supplied'
//         });
//     }
// };



//Serving landing page
app.get("/", (req, res) => {
    res.end(fs.readFileSync("./views/index.html"))
})

// For customer 
//Serving home
app.get("/home", (req, res) => {
    res.end(fs.readFileSync("./views/home.html"))
})

//Serving login page
app.get("/customer-login", (req, res) => {
    res.end(fs.readFileSync("./views/customer-login.html"))
})

//Logging in user
app.post("/verify-customer", async(req, res) => {
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
                bcrypt.compare(req.body.password, response.rows[0].password, function(err, result) {
                    if (result != true) {
                        res.statusCode = 403
                        res.end()
                    } else {
                        jwt.sign({ 'username': req.body.username }, process.env.JWT_KEY, function(err, tokenId) {
                            if (err) {
                                return
                            }
                            res.json(JSON.stringify(`{"token":"${tokenId}"}`));
                        })
                    }
                })
            }
        })
})

app.get("/invalid-login", (req, res) => {
    res.end(fs.readFileSync("./views/invalid-login.html"))
})

//Signing up user
app.post("/customer-sign-up", async(req, res) => {

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
        let sign_up_query = `insert into customers(email,username,password) values ('${req.body.email}','${req.body.username}','${hashed_pwd}')`
        client
            .query(sign_up_query)
            .then(response => {
                console.log(`${req.body} registered in the database successfully!`);
                res.statusCode = 200
                res.end()
            })
            .catch(err => {
                console.error(err);
            });
    }
})

//Serving signed-up
app.get("/signed-up", (req, res) => {
    res.end(fs.readFileSync("./views/signed-up.html"))
})

//Serving profile
app.get("/profile", (req, res) => {
    res.end(fs.readFileSync("./views/profile.html"))
})

//Serving cart
app.get("/cart", (req, res) => {
    res.end(fs.readFileSync("./views/cart.html"))
})

//Serving about
app.get("/about", (req, res) => {
    res.end(fs.readFileSync("./views/about.html"))
})


// For seller 
//Signing up the seller
app.post("/seller-signup", async(req, res) => {

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
        })

    //If user does not exist, then insert into database
    if (!registered) {
        let hashed_pwd = await bcrypt.hash(req.body.password, 10)
        let sign_up_query = `insert into sellers(email,username,password) values ('${req.body.email}','${req.body.username}','${hashed_pwd}')`
        client
            .query(sign_up_query)
            .then(response => {
                console.log(`${req.body} registered in the database successfully!`);
                res.statusCode = 200
                res.end()
            })
            .catch(err => {
                console.error(err);
            });
    }
})

//Logging in seller
app.post("/verify-seller", async(req, res) => {
    let search_query = `select * from sellers where (email='${req.body.username}' OR username='${req.body.username}')`
    await client
        .query(search_query)
        .then(response => {
            //Checking if user is present
            if (response.rows.length == 0) {
                res.statusCode = 403
                res.end()
            } else {
                //Checking if password is correct
                bcrypt.compare(req.body.password, response.rows[0].password, function(err, result) {
                    if (result != true) {
                        res.statusCode = 403
                        res.end()
                    } else {
                        jwt.sign({ 'username': req.body.username }, process.env.JWT_KEY, function(err, tokenId) {
                            if (err) {
                                return
                            }
                            res.json(JSON.stringify(`{"token":"${tokenId}"}`));
                        })
                    }
                })
            }
        })
})

//Serving login to seller
app.get("/seller-login", (req, res) => {
    res.end(fs.readFileSync("./views/seller-login.html"))
})

//Serving login to seller
app.get("/seller-signed-up", (req, res) => {
    res.end(fs.readFileSync("./views/seller-signed-up.html"))
})

//Serving profile
app.get("/seller-profile", (req, res) => {
    res.end(fs.readFileSync("./views/seller-profile.html"))
})

//Serving products to seller
app.get("/seller-products", (req, res) => {
    res.end(fs.readFileSync("./views/seller-products.html"))
})

//Serving about to seller
app.get("/seller-about-us", (req, res) => {
    res.end(fs.readFileSync("./views/seller-about-us.html"))
})


app.listen(process.env.PORT || port)