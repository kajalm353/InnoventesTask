/**
 * This is the music_album model.
 * Creating schema for music_album
 *
 * @class MusicAlbumModel
 */
 var mongoose = require('mongoose')
 
 var musicalbumSchema = new mongoose.Schema(
     {
         Album_Name: { type: String, required: true, unique: true },
         Genre: { type: String, required: true, unique: true },
         Price: { type: String,required: true },
         Description: { type: String, required: true },
         Date_of_Release: { type: Date, default: Date.now() }
     })
 
 var collectionName = 'music_album';
 var music_album = mongoose.model('music_album', musicalbumSchema, collectionName);
 
 module.exports = music_album;