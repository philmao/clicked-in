module.exports = function(sequelize, DataTypes) {
  var project = sequelize.define("project", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    timestamps: false
  });
  return project;
};