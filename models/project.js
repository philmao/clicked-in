module.exports = function(sequelize, DataTypes) {
  var project = sequelize.define("project", {
    name: DataTypes.STRING,
    img_url: DataTypes.STRING,
    description: DataTypes.TEXT
  });

  project.associate = function(models) {
    project.belongsTo(models.profile, {
      onDelete: "cascade"
    });
  };

  return project;
};
