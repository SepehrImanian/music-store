const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const pictureSchema = new Schema({
    music : { type : Schema.Types.ObjectId , ref : 'Music'},
    title: { type:String , required: true},
    body: { type: String , required: true },
    size: { type: Number , required: true},
    pictureUrl: { type: String }
});

pictureSchema.plugin(timestamps);
module.exports = mongoose.model('Picture' , pictureSchema);