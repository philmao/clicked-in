var db = require('../models');
var path =  require("path");

module.exports = function(app) {

    app.get('/', function(req, res) {

        db.profile.findAll({}).then(function(profiles){
            res.render('index', { profiles });
        });
        
    });

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
