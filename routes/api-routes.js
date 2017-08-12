var db = require("../models");

module.exports = function(app) {

    app.post("/filter", function(req, res) {
        // create takes an argument of an object describing the item we want to
        // insert into our table. In this case we just we pass in an object with a text
        // and complete property (req.body)
		var linkedinUser = require('../services/checkForLinkedInUser')(req);

        if (req.body.length === 0) {
            return;
        }

        var data = req.body;
        var querySkillWhere = {};

        Object.keys(req.body).forEach(function(key) {
            querySkillWhere[key] = true;
            /* {
			key1: true,
			key2: true
	  	} */
        });
        console.log(querySkillWhere);

        db.Skill.findAll({
            where: querySkillWhere
        }).then(function(dbSkill) {
            // console.log(dbSkill);
            var queryProfileWhere = {
                $or: []
            };

            if (dbSkill.length !== 0) {
                for (var i = 0; i < dbSkill.length; i++) {
                    queryProfileWhere.$or.push({
                        id: dbSkill[i].dataValues.profileId
                    });
                }
            }
            console.log(queryProfileWhere);

			if (req.isAuthenticated()) {
	            db.profile.findOne({
	                'where': {
	                    $or: [
	                        {
	                            'username': req.user.username
	                        },
	                        {
	                            'linkedin_id': req.user.id
	                        }
	                    ]
	                }
	            }).then(currentU => {
					db.profile.findAll({
		                where: queryProfileWhere
		            }).then(function(profiles) {
		                res.render('index', {
		                    profiles,
		                    user: req.user,
		                    currentU,
		                    linkedinUser,
		                    title: 'Profiles Filtered By Skill',
		                    authentication: req.isAuthenticated(),
		                });
		            });
            	});
			}
        });
    });
}
