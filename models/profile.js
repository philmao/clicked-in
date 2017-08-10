var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var profile = sequelize.define("profile", {
    name: DataTypes.STRING,
    img_url: DataTypes.STRING,
    title: DataTypes.STRING,
    about: DataTypes.TEXT,
    linkedin_url: DataTypes.STRING,
    github_url: DataTypes.STRING,
    personal_url: DataTypes.STRING,
    endorsements: {
      type : DataTypes.INTEGER,
      defaultValue: 0
    },
    endorsed_people: {
      type : DataTypes.TEXT,
    },
    linkedin_id: {type: DataTypes.STRING, unique: true},
    username: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, unique: true}
  },
	{
		classMethods: {
			validPassword: function(password, passwd, done, user){
				bcrypt.compare(password, passwd, function(err, isMatch){
					if (err) console.log(err)
					if (isMatch) {
						return done(null, user)
					} else {
						return done(null, false)
					}
				})
			}
		}
	});


  profile.hook("beforeCreate", function(profile){
    console.log(bcrypt.hashSync(profile.password, bcrypt.genSaltSync(8)));
    profile.password = bcrypt.hashSync(profile.password, bcrypt.genSaltSync(8));
  })

  // profile.associate = function(models) {
  //   // Associating Author with Posts
  //   // When an Author is deleted, also delete any associated Posts
  //   profile.hasMany(models.project, {
  //     onDelete: "cascade"
  //   });
  // };

  profile.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    profile.hasMany(models.frontend_skill, {
      onDelete: "cascade"
    });
  };

  profile.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    profile.hasMany(models.backend_skills, {
      onDelete: "cascade"
    });
  };

  profile.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    profile.hasMany(models.design_skills, {
      onDelete: "cascade"
    });
  };

  return profile;
};
