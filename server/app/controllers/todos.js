'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Todo = mongoose.model('MyModel'),
    multer = require('multer'),
    mkdirp = require('mkdirp'),
    
    passport = require('passport');
    

    var requireAuth = passport.authenticate('jwt', { session: false });

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {      
              var path = config.uploads + req.params.userId + "/";
            mkdirp(path, function(err) {
                if(err){
                    res.status(500).json(err);
                } else {
                    cb(null, path);
                }
            });
        },
        filename: function (req, file, cb) {
            let fileName = file.originalname.split('.');   
            cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
        }
      });
      var upload = multer({ storage: storage });
      router.post('/todos/upload/:userId/:todoId', upload.any(), function(req, res, next){
          logger.log('Upload file for todo ' + req.params.todoId + ' and ' + req.params.userId, 'verbose');
          
          Todo.findById(req.params.todoId, function(err, todo){
              if(err){ 
                  return next(err);
              } else {     
                  if(req.files){
                      todo.file = {
                          filename : req.files[0].filename,
                          originalName : req.files[0].originalname,
                          dateUploaded : new Date()
                      };
                  }           
                  todo.save()
                      .then(todo => {
                          res.status(200).json(todo);
                      })
                      .catch(error => {
                          return next(error);
                      });
              }
          });
      });
      

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
        var todo = new Todo(req.body);
        todo.save()
        .then(result =>{ 
            res.status(201).json(result);
        })
        .catch(err => {
            return next(err);
        });        
})
}