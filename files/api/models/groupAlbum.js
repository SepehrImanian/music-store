const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const groupAlbumSchema = new Schema({
    name: { type:String , required: true},
    body: { type: String , required: true },
    year: { type: String , required: true },
    size: { type: Number , required: true },
    albumNumber: { type: Number , required: true },
    albums: [{ type : Schema.Types.ObjectId , ref : 'Album'}]
});

groupAlbumSchema.plugin(timestamps);
module.exports = mongoose.model('groupAlbum' , groupAlbumSchema);