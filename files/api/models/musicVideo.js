const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const musicVideoSchema = new Schema({
    music : { type : Schema.Types.ObjectId , ref : 'Music'},
    name: { type:String , required: true},
    size: { type: Number , required: true},
    body: { type: String , required: true },
    musicVideoUrl:{ type: String }
});

musicVideoSchema.plugin(timestamps);
module.exports = mongoose.model('musicVideo' , musicVideoSchema);