'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    User = mongoose.model('MyModel2')


module.exports = function (app, config) {
    app.use('/api', router);
    
    router.get('/users', function(req,res,next){
        logger.log('Get all users');

        res.status(200).json({message: 'Get all Users'})
    });

    router.get('/users/:userID', function(req,res,next){
        logger.log('Get user' + req.params.userid, 'verbose');

        res.status(200).json({message: 'Get Users' + req.params.userid})
    });

    router.post('/users', function(req,res,next){
        logger.log('Create user', 'verbose');

        res.status(201).json({message: 'User created'});
    })}