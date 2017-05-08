// Import modules
var express = require('express');
var router = express.Router();
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
mongoose.Promise = Promise;

// Call express
var app = express();

// Set variables
var port = 8081;

// Allow form submissions
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Setting the public folder for stylesheets, scripts and images
app.use (express.static('build'));

// Set global connection variable
global.db = (global.db ? global.db : mongoose.createConnection('mongodb://localhost/games-monitor'));

// Set the view engine to handlebars
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Models
var Game = require('./models/games.js');
var Genre = require('./models/genres.js');
var Platform = require('./models/platforms.js');
var Feature = require('./models/features.js');
var Session = require('./models/sessions.js');

// var newGame = new Game({
// 	title: 'Zelda: Twilight Princess',
// 	genre: 'Adventure',
// 	platform
// }); 

// newGame.save();

// Routes
app.post('/', function(req, res, next) {
	console.log("Action to perform is " + req.body.action);
	if (req.body.action) {
		var saveObject;
		switch (req.body.action) {			
			case 'game':
				saveObject = new Game({
					title: req.body.gameTitle,
					genres: [req.body.chooseGenre],
					platforms: [req.body.choosePlatform],
					releaseDate: req.body.releaseDate,
					extensionOf: req.body.chooseExtension,
					features: req.body.chooseFeatures
				});
				break;

			case 'feature':
				saveObject = new Feature({
					title: req.body.featureTitle,
					description: req.body.description,
				});
				break;

			case 'platform':
				saveObject = new Platform({
					title: req.body.platformTitle,
					releaseDate: req.body.platformReleaseDate,
				});
				break;

			case 'genre':
				saveObject = new Genre({
					title: req.body.genreTitle
				});
				console.log("Adding genre");
				// saveObjects.newGenre.save();
				break;

			case 'session':
				saveObject = new Session({
					game: req.body.chooseGamePlayed,
					hoursPlayed: req.body.hoursPlayed * 60,
					purchaseDate: req.body.purchaseDate,
					startDate: req.body.startDate,
					finishDate: req.body.finishDate
				});
				
				break;

			default:
		}
		// console.log("The save objects:", saveFunctions[0]);
		saveObject.save()
		.then(function() {
			console.log("saved all the things!");
			next();
		})
	}

});


app.all('/', function(req, res) {
	var p1 = Game.find().populate('platforms').populate('genres').populate('features').populate('extensionOf');
	var p2 = Genre.find();
	var p3 = Feature.find();
	var p4 = Platform.find();
	var p5 = Session.find().populate('game');
	Promise.all([p1,p2,p3,p4,p5])
	.then(function(results) {
		console.log("promises resolved", results[4]);
		res.render('pages/index', {
			games: results[0],
			genres: results[1],
			features: results[2],
			platforms: results[3],
			sessions: results[4]
		});
	});
});

// Other routes
app.use('/game/', require('./routes/view-game.js'));
app.use('/add-new', require('./routes/add-new.js'));


app.use(router);

app.listen(port, function() {
	console.log("Example app listening on port " + port);
});