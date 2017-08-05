var db = require('../models');

module.exports = function(app) {

    app.get('/', function(req, res) {

        db.profile.findAll({}).then(function(profiles){
            res.render('index', { profiles });
        });
        
    });

};
