module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    timestamps: false
  });
  return Project;
};