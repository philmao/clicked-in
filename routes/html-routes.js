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
            var endorsed_ppl = "phil,david,blake".split(",");
            res.render('index', { profiles, user: req.user, linkedinUser, title: 'All Profiles', authentication: req.isAuthenticated(),endorsed_ppl });
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
            res.redirect("/");
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
            
            res.redirect('./');
            
        })
    })
    
    app.post("/endorsement", function(req,res){
        //var endorsed_username = ....
        var endorser;
        var endorsed_username;
        
        
        //If logged in
        if(req.isAuthenticated()){
            
            db.profile.findOne({
                where:{
                    username : req.user.username
                }
            }).then(function(endorser){
                var endorsed = false;
                
                console.log("To be endorsed user: "+req.body.username);
                console.log("Logged in user: "+ req.user.username)
                
                var endorsed_ppl = endorser.endorsed_people.split(",");
                
                //Check if endorsed before
                for(i = 0; i < endorsed_ppl.length;i++){
                    console.log(endorsed_ppl[i])
                    if(req.body.username == endorsed_ppl[i]){
                        endorsed = true;
                    }
                }
                
                //+1 to endorsed username if not endorsed already by endorser
                if(endorsed == false){
                    db.profile.findOne({
                        where:{
                            username : req.body.username
                        }
                    }).then(function(profile){
                        //tick endorsement up by 1
                        console.log("Total endorsement by "+ req.body.username+" :"+profile.endorsements)
                        var total_endorsements = parseInt(profile.endorsements);
                        profile.updateAttributes({
                            endorsements : ++total_endorsements
                        })
                    })
                    
                    //Add to list of endorsed people by logged in user
                    db.profile.findOne({
                        where:{
                            username: req.user.username
                        }
                    }).then(function(profile){
                        var endorsed_people = profile.endorsed_people;
                        endorsed_people+=req.body.username+","
                        profile.updateAttributes({
                            endorsed_people :  endorsed_people
                        }).then(function(){
                            res.redirect("/");
                        })
                    })
                }
            }) 
            
        } else {
            res.redirect("/login")
        }
    })
    
};
