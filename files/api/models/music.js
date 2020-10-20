const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const musicSchema = new Schema({
    albums: { type : Schema.Types.ObjectId , ref : 'Album'},
    name: { type:String , required: true},
    size: { type: Number , required: true},
    singerName: { type: String , required: true},
    body: { type: String , required: true },
    viewCount : { type : Number  , default : 0 },
    commentCount : { type : Number , default : 0 },
    musicUrl: { type: String },
    pictures : [{ type : Schema.Types.ObjectId , ref : 'Picture'}],
    musicVideos : [{ type : Schema.Types.ObjectId , ref : 'musicVideo'}]
});

musicSchema.plugin(timestamps);
module.exports = mongoose.model('Music' , musicSchema);