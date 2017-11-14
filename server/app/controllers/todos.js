'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    User = mongoose.model('MyModel')


module.exports = function (app, config) {
    app.use('/api', router);
    
    router.get('/users', requireAuth, function(req,res,next){
        logger.log('Get all users');
        var query = User.find()
            .sort(req.query.order)
            .exec()
            .then(result =>{
                if(result && result.length){
                    res.status(200).json(result);
                }else{
                    res.status(404).json({message: "No users"});
                }
            })
            .catch(err => {
                return next(err);
            })
    });

    router.get('/users/:userID', requireAuth, function(req,res,next){
        logger.log('Get user' + req.params.userid, 'verbose');

        res.status(200).json({message: 'Get Users' + req.params.userid})
    });

    router.post('/users', function(req,res,next){
        logger.log('Create user', 'verbose');
        var user = new User(req.body);
        user.save()
        .then(result =>{ 
            res.status(201).json(result);
        })
        .catch(err => {
            return next(err);
        });        
})}