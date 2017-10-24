var path = require('path'),    
rootPath = path.normalize(__dirname + '/..'),    
env = process.env.NODE_ENV || 'development';

//just need development piece for exam will have to change name and database for test
var config = {  
    root: rootPath,    
    app: {      name: 'ToDo'},
    port: 5000,
    db: 'mongodb://127.0.0.1/todo-dev'        
},



module.exports = config[env];
