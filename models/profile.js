module.exports = function(sequelize, DataTypes) {
  var profile = sequelize.define("profile", {
    name: DataTypes.STRING,
    img_url: DataTypes.STRING,
    title: DataTypes.STRING,
    about: DataTypes.TEXT,
    linkedin_url: DataTypes.STRING,
    github_url: DataTypes.STRING,
    personal_url: DataTypes.STRING
  });

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