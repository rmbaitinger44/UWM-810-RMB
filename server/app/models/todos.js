var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var mySchema = new Schema({
    userId: {type:Schema.Types.ObjectId, required: true},
    todo: {type:String, required: true},
    description: {type:String},
    dateCreated: {type: Date, default: Date.now},
    dateDue: {type: Date, default: Date.now},
    completed: {type: Boolean, default: false},
    file: {
        filename: { type: String},
        originalName: { type: String },
        dateUploaded: { type: Date, default: Date.now}
}
}
);

module.exports = 
 Mongoose.model('MyModel', mySchema);
