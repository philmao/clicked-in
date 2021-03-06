// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var session = require("express-session");
var flash = require("express-flash");
var expressValidator = require("express-validator");
var passport = require("passport");
var path = require("path");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var Handlebars = require("handlebars");
var methodOverride = require('method-override');
var passport = require('passport');
var session = require("express-session");
var flash = require("express-flash");

require('./services/passport');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8000;

// Requiring our models for syncing
var db = require("./models");

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
    // cookie: {
    //     secure: true
    // }
}));

// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete LinkedIn profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


//Salt Complexity
SALT_WORK_FACTOR = 12;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
let hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        listFront: function(skills, options) {
            var trueFrontSkills = [];

            skills[0]._options.attributes.forEach(attr => {
                var splitStr = attr.split('_');

                if (splitStr[0] === 'front' && skills[0][attr]) {
                    trueFrontSkills.push(splitStr[1]);
                }
            });

            var out = '<ul class="list">';


            for (var i = 0; i < trueFrontSkills.length; i++) {
                out += "<li>" + trueFrontSkills[i] + "</li>";
            }

            out += "</ul>";
            return out;
        },
        listBack: function(skills, options) {
            var trueBackSkills = [];

            skills[0]._options.attributes.forEach(attr => {
                var splitStr = attr.split('_');

                if (splitStr[0] === 'back' && skills[0][attr]) {
                    trueBackSkills.push(splitStr[1]);
                }
            });

            var out = '<ul class="list">';

            for (var i = 0; i < trueBackSkills.length; i++) {
                out += "<li>" + trueBackSkills[i] + "</li>";
            }

            out += "</ul>";
            return out;
        },
        listDesign: function(skills, options) {
            var trueDesignSkills = [];

            skills[0]._options.attributes.forEach(attr => {
                var splitStr = attr.split('_');

                if (splitStr[0] === 'design' && skills[0][attr]) {
                    trueDesignSkills.push(splitStr[1]);
                }
            });

            var out = '<ul class="list">';

            for (var i = 0; i < trueDesignSkills.length; i++) {
                out += "<li>" + trueDesignSkills[i] + "</li>";
            }

            out += "</ul>";
            return out;
        },
        ifEndorsed: function(username, user) {
            var out = '<i class="fa fa-star-o" aria-hidden="true"></i>';
            if (user) {
                var endorsedList;
                if (user.endorsed_people) {
                    endorsedList = user.endorsed_people.split(',');

                    if (endorsedList.includes(username)) {
                        out = '<i class="fa fa-star" aria-hidden="true"></i>';
                    } else {
                        out = '<i class="fa fa-star-o" aria-hidden="true"></i>';
                    }
                }
            }
            return out;
        }
    }
});


app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Serve static content for the app from the "public" directory in the application directory.
app.use('/public', express.static(__dirname + "/public"));

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch',
    resave: false,
    saveUninitialized: true
})); // session secret
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/auth-routes.js")(app);
require("./routes/api-routes.js")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
// require("./routes/author-api-routes.js")(app);
// require("./routes/post-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
