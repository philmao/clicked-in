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

};
