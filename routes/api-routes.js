var db = require("../models");

module.exports = function(app) {

	app.post("/filter", function(req, res) {
	  // create takes an argument of an object describing the item we want to
	  // insert into our table. In this case we just we pass in an object with a text
	  // and complete property (req.body)

	  if(req.body.length === 0) {
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
	  	console.log(dbSkill);
	  	var queryProfileWhere = {
	  		$or: []
	  	};

	  	if(dbSkill.length !== 0) {
	  		for(var i = 0; i < dbSkill.length; i++) {
	  			queryProfileWhere.$or.push({ id: dbSkill[i].dataValues.profileId });
	  		}
	  	}
	  	console.log(queryProfileWhere);

  	    db.profile.findAll({
  	    	where: queryProfileWhere
  	    }).then(function(profiles){
  	        res.render('index', { profiles });
  	    });

	  });

	});
}