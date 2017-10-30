var express = require('express')
var config = require('./config/config')    

//create the express object
var app = express();    

//configure the express object
require('./config/express')(app, config);

//start server
require('http').createServer(app).listen(config.port, function () {
    console.log("HTTP Server listening on port: " + config.port + ", in " + app.get('env') + " mode");
});

module.exports = app;
