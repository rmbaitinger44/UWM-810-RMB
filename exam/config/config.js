var path = require('path'),    
    rootPath = path.normalize(__dirname + '/..'),    
    env = process.env.NODE_ENV || 'development';

//defining root, app, port and db for use in other .js files
var config = { 
    development: { 
        root: rootPath,    
        app: {name: 'Exam'},
        port: 5000,
        db: 'mongodb://127.0.0.1/todo-dev'        
}}


module.exports = config[env];