var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

//Define schema
var mySchema = new Schema({
    property1: {type:String, required: true},
    property2: {type:Number, required: true},
});

//export schema so can be called
module.exports = 
 Mongoose.model('ExamModel', mySchema);
