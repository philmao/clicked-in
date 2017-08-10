var db = require('../models');
var path =  require("path");
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app) {

    // root route - runs Sequelize findAll() to show all profiles
    app.get('/', function(req, res) {
        console.log(req.user);
        var linkedinUser;

        if (req.isAuthenticated()) {
            if (req.user.provider === 'linkedin') {
                linkedinUser = true;
            } else {
                linkedinUser = false;
            }
        }

        db.profile.findAll({}).then(function(profiles){
            res.render('index', { profiles, user: req.user, linkedinUser, title: 'All Profiles', authentication: req.isAuthenticated() });
        });

    });

    // linkedin-signup - renders sign-up page to register a new profile
    app.get('/linkedin-signup', function(req, res) {
        res.render('sign-up', { user: req.user, title: 'Register Your Profile', authentication: req.isAuthenticated() });
    });

    // signup-submit - posts a new profile to db
    app.post('/signup-submit', function(req, res) {
        // console.log(res);
        console.log(req.user);
        console.log(req.body);
    });


    // For Authentication Purposes


    app.get('/login', function(req,res){
        if(req.isAuthenticated()){
            res.redirect("/myprofile");
        } else {
            req.flash("error")
            res.sendFile(path.join(__dirname+'/login.html'));
        }
    })


    //Send back data through /myprofile url after User is logged in
    app.get('/myprofile', function(req,res){
        if(req.isAuthenticated()){
            res.json(req.user)
        } else {
            res.redirect("/login")
        }
    })

    //User name and password sign up
    app.get('/signup', function(req,res){
        res.sendFile(path.join(__dirname+'/signup.html'));
    })

    app.post("/register",function(req,res){
        console.log(req.body.username);
        console.log(req.body.password);
        db.profile.create({
            name: "Blake",
            img_url: "Google.com",
            title: "fullstack developer",
            about: "Hello my name is blake I am an aspiring developer",
            linkedin_url: "linkedin.com",
            github_url: "github.com",
            personal_url: "blake.com",
            username: req.body.username,
            password: req.body.password
        }).then(function(profile) {
            console.log(profile.id);
            console.log(profile.dataValues.id);

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

            res.redirect('/login');

        })
    })

    app.post("/endorsement", function(req,res){
        //var endorsed_username = ....
        var endorser;
        var endorsed_username;

        //tick endorsement up by 1
        if(req.isAuthenticated()){
            //
            db.profile.findOne({
                username : endorser
            }).then(function(profile){
                var endorsed = false;
                var endorsed_ppl = profile.endorsed_people.split(",").trim();

                //Search if user has endorsed this user before
                for(i = 0; i < endorsed_ppl.length){
                    if(endorsed_username == endorsed_ppl[i]){
                        endorsed = true;
                    }
                }

                //+1 to endorsed username if not endorsed already by endorser
                if(endorsed == false){
                    db.profile.findOne({
                        username = endorsed_username
                    }).then(function(profile){
                        profile.updateAttributes({
                            endorsement : profile.endorsement++;
                        })
                    })

                    //Add to list of endorsed people
                    db.profile.findOne({
                        username = endorser
                    }).then(function(profile){
                        var endorsed_ppl = profile.endorsed_people;
                        endorsed_ppl+=endorsed_username+","
                        profile.updateAttributes({
                            endorsed_people :  endorsed_ppl
                        })
                    })
                }
            })


            // db.profile.findOne({
            //     username = endorsed_username
            // }).then(function(profile){
            //     endorsement : profile.endorsement++;
            // })
        } else {
            res.redirect("/login")
        }
    })

};
