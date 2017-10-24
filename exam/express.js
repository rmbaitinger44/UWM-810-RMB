var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var glob = require('glob');


module.exports = function (app, config) {
  console.log("Loading Mongoose functionality");
  mongoose.Promise = require('bluebird');
  mongoose.connect(config.db, {useMongoClient: true});
  var db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
  });



  if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));

    mongoose.set('debug', true);
    mongoose.connection.once('open', function callback() {
      console.log("Mongoose connected to the database");
    });
  
    app.use(function (req, res, next) {
      console.log('Request from ' + req.connection.remoteAddress, 'info');
      next();
    });
  }


  //loading body parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
      extended: true
  }));
  
  //loads schemas from models -- pull names and file path from actual file in models folder in exam
  var models = glob.sync(config.root + '/app/models/*.js');
  models.forEach(function (model) {
    require(model);
  });

//loading models has to occur before the step
  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller);
  });


  app.use(express.static(config.root + '/public'));
  
  //error handlers
  app.use(function (req, res) {
    res.type('text/plan');
    res.status(404);
    res.send('404 Not Found');
  });
  
  //any other error
  app.use(function (err, req, res, next) {
    if(process.env.NODE_ENV !== 'test') {
      console.error(err.stack);
    }
    res.type('text/plan');
    res.status(500);
    res.send('500 Sever Error');
  });
  
  logger.log("Starting application");
  
};