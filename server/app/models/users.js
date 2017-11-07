var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

//Define schema
var mySchema = new Schema({
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    status: {type:Boolean, default: true},
    // email: {type:String, required: true, unique: yes},
    password: {type: String, required: true},
    dateRegistered: {type: Date, default: Date.now}
});

//export schema so can be called
module.exports = 
 Mongoose.model('MyModel2', mySchema);
