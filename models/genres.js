var mongoose = require('mongoose');
mongoose.Promise = Promise;

var genreSchema = mongoose.Schema({
	title: String
});

var Genre = db.model('Genre', genreSchema);

module.exports = Genre;