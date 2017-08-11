var db = require('../models');
var path =  require("path");
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app) {
    // root route - runs Sequelize findAll() to show all profiles
    app.get('/', function(req, res) {
        console.log(req.user);

    function checkForLinkedInUser(req) {
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

        return linkedinUser;
    }

    // root route - runs Sequelize findAll() to show all profiles
    app.get('/', function(req, res) {
        // console.log(req.user);

        var linkedinUser = checkForLinkedInUser(req);

        db.profile.findAll({}).then(function(profiles){
            res.render('index', {
                profiles,
                user: req.user,
                linkedinUser,
                title: 'All Profiles',
                authentication: req.isAuthenticated()
            });
        });
        
    });

    app.get('/viewprofile/:profileId?', function(req, res) {
        db.profile.findOne({
            'where': {
                'id': req.params.profileId
            }
        }).then(profile => {
            if (!profile) {
                res.redirect('/');
            }
            db.backend_skill.findAll({
                'where': {
                    'profileId': profile.id
                }
            }).then(backEndSkillSet => {
                db.frontend_skill.findAll({
                    'where': {
                        'profileId': profile.id
                    }
                }).then(frontEndSkillSet => {
                    var trueSkills = require('../services/getSkillNames')(frontEndSkillSet, backEndSkillSet);

                    db.project.findAll({
                        'where': {
                            'profileId': profile.id
                        }
                    }).then(projects => {
                        res.render('profile-view', {
                            profile,
                            projects,
                            'title': profile.name,
                            'frontSkills': trueSkills.trueFrontSkills,
                            'backSkills': trueSkills.trueBackSkills,
                        });
                    });

                });// <-- frontend.findAll
            });// <-- backend.findAll
        });// <-- profile.findOne
    });

    // linkedin-signup - renders sign-up page to register a new profile
    app.get('/linkedin-signup', function(req, res) {
        var linkedinUser = checkForLinkedInUser(req);

        res.render('sign-up', {
            user: req.user,
            linkedinUser,
            img_url: req.user._json.pictureUrls.values[0],
            title: 'Register Your Profile',
            authentication: req.isAuthenticated()
        });
    });
    
    // signup-submit - posts a new profile to db
    app.post('/signup-submit', function(req, res) {

        db.profile.create({
            'username': req.body.username,
            'name': req.body.name,
            'img_url': req.body.img_url,
            'title': req.body.title,
            'about': req.body.about,
            'linkedin_url': req.body.linkedin_url,
            'github_url': req.body.github_url,
            'personal_url': req.body.personal_url,
            'linkedin_id': req.user.id
        }).then(profile => {

            // use helper function to separate frontend & backend skills from req.body
            var separateFields = require('../services/separateFields')(req.body, profile.dataValues.id);

            // create new skills rows in corresponding tables
            db.frontend_skill.create(separateFields.frontEnd);
            db.backend_skill.create(separateFields.backEnd);

            // create new project(s)
            console.log(' ---- projects ----')
            console.log(separateFields.projects);

            separateFields.projects.forEach(project => {
                db.project.create(project);
            });
        }).then(() => {
            res.redirect('/');
        });

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
