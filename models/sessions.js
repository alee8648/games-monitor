var mongoose = require('mongoose');
mongoose.Promise = Promise;

var sessionSchema = mongoose.Schema({
	game: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Game'
	},
	hoursPlayed: Number,
	purchaseDate: Date,
	startDate: Date,
	finishDate: Date,
});

var Session = db.model('Session', sessionSchema);

module.exports = Session;