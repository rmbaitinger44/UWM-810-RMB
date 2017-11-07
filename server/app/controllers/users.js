'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    User = mongoose.model('MyModel2')


module.exports = function (app, config) {
    app.use('/api', router);
        
        //Router for get all users
        router.get('/users', function(req,res,next){
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
    
        //Router for creating a document
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