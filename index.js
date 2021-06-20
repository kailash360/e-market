const express = require("express")
const fs = require('fs')
const path = require("path")
const bodyparser = require("body-parser")
const app = express()
const hostname = '127.0.0.1';
const port = 80;

//Setting source of static,javascripts,
app.use('/static', express.static('static'))
app.use('/scripts', express.static('scripts'))
app.use(express.urlencoded())


//Setting source of html files 
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});