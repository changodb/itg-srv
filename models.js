var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var simfileSchema = new Schema({
    song_name: String,
    song_artist: String,
    bpm: Number,
    pack_name: String,
    pack_link: String,
    difficulty: { 
      type: Map,
      of: Number
    }
});

const Simfile = mongoose.model('Simfile', simfileSchema);

module.exports = {
  Simfile: Simfile
};