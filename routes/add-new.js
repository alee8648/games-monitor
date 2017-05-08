var express = require('express');
var router = express.Router();

var Game = require('../models/games.js');
var Genre = require('../models/genres.js');
var Platform = require('../models/platforms.js');
var Feature = require('../models/features.js');

router.get('/', function(req, res) {
	Promise.all([
		Game.find(),
		Genre.find(),
		Feature.find(),
		Platform.find()		
	])
	.then(function(results) {
		res.render('pages/add-new', {
			games: results[0],
			genres: results[1],
			features: results[2],
			platform: results[3]
		});
	})
	.catch(function(error) {
		console.log((error.message || error));
	});
});

module.exports = router;