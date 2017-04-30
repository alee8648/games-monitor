var express = require('express');
var router = express.Router();

var Game = require('../models/games.js');

router.get('/:id', function(req, res) {
	Game.findOne({'_id': req.params.id})
	.populate(['features', 'platforms', 'genres'])
	.then(function(game) {
		console.log(game);
		res.render('view-game.handlebars', {
			game: game,
			layout: 'main.handlebars'
		});
	})
	.catch(function(error) {
		console.log((error.message || error));
	})
	
});

module.exports = router;