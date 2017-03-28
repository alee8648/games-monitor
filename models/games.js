var mongoose = require('mongoose');
mongoose.Promise = Promise;

var gameSchema = mongoose.Schema({
	title: {
		type: String,
		unique: true
	},
	genres: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Genre'
	}],
	platforms: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Platform'
	}],
	releaseDate: Date,
	extensionOf: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Game'
	},
	features: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Feature'
	}],
});

var Game = db.model('Game', gameSchema);

module.exports = Game;