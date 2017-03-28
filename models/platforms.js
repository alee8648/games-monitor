var mongoose = require('mongoose');
mongoose.Promise = Promise;

var platformSchema = mongoose.Schema({
	title: String,
	releaseDate: Date
});

var Platform = db.model('Platform', platformSchema);

module.exports = Platform;