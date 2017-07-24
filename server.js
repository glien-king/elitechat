const config = require('./config.js');
var app = require('express')();
const routes = require('./routes.js')(app);

app.listen(config.port);

console.log('elite-chat: listening to connections on port: ' + config.port);