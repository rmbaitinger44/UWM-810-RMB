var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var mySchema = new Schema({
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    registerDate: {type:String, default: Date.now}
});

module.exports = 
 Mongoose.model('MyModel2', mySchema);
