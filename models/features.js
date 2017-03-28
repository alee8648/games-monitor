var mongoose = require('mongoose');
mongoose.Promise = Promise;

var featureSchema = mongoose.Schema({
	title: String,
	description: String
});

var Feature = db.model('Feature', featureSchema);

module.exports = Feature;