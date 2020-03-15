const express = require('express');
const port = process.env.PORT || 3001;
let middleware = require('./middelware')
let generator = require('./server')
var bodyParser = require('body-parser')
const db = require('./queries')


// Starting point of the server
let app = express(); // Export app for other routes to use
let handlers = new generator();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });



app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.post('/api/register', db.createUser);
app.post('/api/login', db.login);
app.use(bodyParser.text({type:"*/*"}));

app.post('/api/justify', middleware.checkToken, handlers.justify);
app.listen(port, () => console.log(`Server is listening on port: ${port}`));

