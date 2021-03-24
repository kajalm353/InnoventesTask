/**
 * This is the musicians model.
 * Creating schema for musicians
 *
 * @class musicians 
 */
 var mongoose = require('mongoose')

 var musicianSchema = new mongoose.Schema(
   {
     Musicalbumid:{type: mongoose.Schema.Types.ObjectId, ref: 'music_album'},
     Musician_Name : { type: String , required: true},
     Musician_Type: {type: String, required:true}
   })
 
 
 var collectionName = 'musicians';
 var musicians = mongoose.model('musicians', musicianSchema, collectionName);
 
 module.exports = musicians;