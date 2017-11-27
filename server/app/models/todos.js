var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var mySchema = new Schema({
    userId: {type:Schema.Types.ObjectId, required: true},
    todo: {type:String, required: true},
    description: {type:String},
    dateCreated: {type: Date, default: Date.now},
    dateDue: {type: Date, default: Date.now},
    completed: {type: Boolean, default: false},
    // file: {type: fileName}
});

module.exports = 
 Mongoose.model('MyModel', mySchema);
