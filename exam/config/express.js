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
  
  //commente4d out during troubleshooting --glob ended up not working properly
  //loads schemas from models
  // var models = glob.sync(config.root + './models/exammodel.js');
  // models.forEach(function (model) {
  //   require(model);
  // });

  require('../models/exammodel.js');

  require('../controllers/examcontroller.js')(app, config);

//commente4d out during troubleshooting --glob ended up not working properly
  //loading models has to occur before the step
  // var controllers = glob.sync(config.root + './controllers/examcontroller.js');
  // controllers.forEach(function (controller) {
  //   console.log(controller)
  //   require(controller)(app,config);
  // });


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
  });}