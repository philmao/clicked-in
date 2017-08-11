module.exports = function(sequelize, DataTypes) {

  var Project = sequelize.define("Project", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    timestamps: false
  });

  Project.associate = function(models) {
    Project.belongsTo(models.profile, {
      onDelete: "cascade"
    });
  };

  return Project;
};
