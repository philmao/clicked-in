var db = require('../models');
var path =  require("path");
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app) {

    // root route - runs Sequelize findAll() to show all profiles
    app.get('/', function(req, res) {
        
        db.profile.findAll({}).then(function(profiles){
            res.render('index', { profiles, user: req.user, title: 'All Profiles', authentication: req.isAuthenticated() });
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
    
    // Serialize Sessions
    passport.serializeUser(function(user, done){
        done(null, user);
    });
    
    //Deserialize Sessions
    passport.deserializeUser(function(user, done){
            done(null, user);
    });
    
    // For Authentication Purposes
    passport.use('local-login',new LocalStrategy(
        function(username, password, done){
            db.profile.find({where: {username: username}}).then(function(user){
                console.log(user)
                if(!user){
                    return done(null,false,{message:"Unknown username"})
                }
                console.log("Database PW:"+user.password)
                console.log("Entered password:"+ password);
                //Check if password is valid and return done(user) with user object if it is
                var pwMatched = bcrypt.compareSync(password,user.password);
                if(pwMatched){
                    return done(null,user);
                }
                if(!pwMatched){
                    return done(null,false,{message: "Wrong password"});
                }
            });
        }
    ));
    
    app.get('/login', function(req,res){
        if(req.isAuthenticated()){
            res.redirect("/myprofile");
        } else {
        req.flash("error")
        res.sendFile(path.join(__dirname+'/login.html'));
        }
    })
    
    app.post('/login',passport.authenticate('local-login',{
        successRedirect: "/myprofile",
        failureRedirect:"/login",
        failureFlash: "wrong"
    }));
    
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
            
        })
    })
    
};
