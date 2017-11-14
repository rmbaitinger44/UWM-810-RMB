var path = require('path'),    
    rootPath = path.normalize(__dirname + '/..'),    
    env = process.env.NODE_ENV || 'development';

//just need development piece for exam will have to change name and database for test
    var config = {  
        development: {
            root: rootPath,
            app: {      name: 'Chirps'    },
            port: 5000,
            db: 'mongodb://127.0.0.1/chirps-dev',
            secret: "cayennedlikedhistreats"
          },
        
    
    test: {
        root: rootPath,
        app: {      name: 'ToDo'    },
        port: 4000,
        db: 'mongodb://127.0.0.1/todo-test',
        secret: "cayennedlikedhistreats"
     },
    

    production: {    
        root: rootPath,    
        app: {      name: 'ToDo'},    
        port: 80,
        db: 'mongodb://127.0.0.1/todo',
        secret: "cayennedlikedhistreats"
    }
    };

module.exports = config[env];
