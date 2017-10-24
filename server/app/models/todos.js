var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var mySchema = new Schema({
    firstname: {type:String, required: true},
    lastname: {type:String, required: true},
    registerDate: {type: Date, default: Date.now}
});

module.exports = 
 Mongoose.model('MyModel', mySchema);
