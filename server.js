// Requiring necessary npm packages
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
// Requiring passport as we've configured it
const passport = require('./config/passport');

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require('./models');

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: '8913iohlkao9c8h1;39h;g9avj81h9', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require('./controllers/html-routes.js')(app);
require('./controllers/dd_controller.js')(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then( () => {
	app.listen(PORT, () => {
		console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
	});
});