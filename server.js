const config = require('./config.js');
var app = require('express')();


app.listen(config.port);
console.log('elite-chat: listening to connections on port: ' + config.port);