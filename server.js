var express = require('express');
var cors = require('cors');
const rateLimit = require("express-rate-limit"); // Middleware pour limiter les tentatives de connexions
var bodyParser = require('body-parser');
var xss = require('xss-clean'); // nettoie le retour des GET et POST 
var app = express();
var helmet = require('helmet'); // Helmet aide a securiser les app Express en mettant en place differents headers
var basicAuth = require("express-basic-auth"); // Met en place une Authentification pour les requetes
var port = process.env.PORT || 5000;

app.use(helmet());

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(basicAuth( { authorizer: myAuthorizer } ));

function myAuthorizer(username, password) {
    const userMatches = basicAuth.safeCompare(username, 'projet_node');
    const passwordMatches = basicAuth.safeCompare(password, 'nodejs');
 
    return userMatches & passwordMatches;
}

app.use(express.json({ limit: '10kb' })); // Body limit is 10

var Users = require('./routes/Users');

const limit = rateLimit({
    max: 500,// max requests
    windowMs: 5* 60 * 1000, // 1 Hour
    message: 'Too many requests please wait 5 minutes' // message to send
});
app.use('/api', limit); // Setting limiter on specific route

app.use('/api', Users);

app.use(xss());

app.listen(port, function() {
  console.log('Server is running on port: ' + port);
});