const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const albumSchema = new Schema({
    groupAlbums: { type : Schema.Types.ObjectId , ref : 'groupAlbum'},
    name: { type:String , required: true},
    body: { type: String , required: true },
    year: { type: String , required: true },
    size: { type: Number , required: true },
    musicNumber: { type: Number , required: true },
    musics: [{ type : Schema.Types.ObjectId , ref : 'Music'}]
});

albumSchema.plugin(timestamps);
module.exports = mongoose.model('Album' , albumSchema);