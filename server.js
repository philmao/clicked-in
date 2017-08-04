// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
// app.use(express.static("public"));

// Routes
// =============================================================
// require("./routes/html-routes.js")(app);
// require("./routes/author-api-routes.js")(app);
// require("./routes/post-api-routes.js")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({force:true}).then(function() {
	app.listen(PORT, function() {
		console.log("App listening on PORT " + PORT);

		db.profile.create({
			name: "Blake",
			img_url: "Google.com",
			title: "fullstack developer",
			about: "Hello my name is blake I am an aspiring developer",
			linkedin_url: "linkedin.com",
			github_url: "github.com",
			personal_url: "blake.com"
		}).then(function(profile) {
			db.backend_skills.create({
				mysql : true,
				profileId: profile.id
			});

			db.frontend_skill.create({
				javascript: true,
				profileId: profile.id
			});

			db.design_skills.create({
				photoshop: true,
				profileId: profile.id
			});

		})
	});
});


