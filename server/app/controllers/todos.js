'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Todo = mongoose.model('MyModel'),
    passport = require('passport');

    var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);
    
    router.get('/todos', requireAuth, function(req,res,next){
        logger.log('Get all todos');
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

    router.get('/todos/:userId', requireAuth, function(req,res,next){
        logger.log('Get todo' + req.params.userid, 'verbose');

        res.status(200).json({message: 'Get Users' + req.params.userid})
    });

    router.get('/todos/user/:userId', function(req,res,next){
        logger.log('Get all todos for ' + req.params.userId, 'verbose')

        Todo.find({userId: req.params.userId})
            .then(todos => {
                if(todos){
                    res.status(200).json(todos);
                } else {
                    return next(error)
                }
    
            });
    });

    router.post('/todos', function(req,res,next){
        logger.log('Create todo', 'verbose');
        var user = new User(req.body);
        user.save()
        .then(result =>{ 
            res.status(201).json(result);
        })
        .catch(err => {
            return next(err);
        });        
})
}