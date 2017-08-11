module.exports = function(sequelize, DataTypes) {
  var frontend_skill = sequelize.define("frontend_skill", {
    html: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    css: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    javascript: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    ajax: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    jquery: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    bootstrap: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    react: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    angular: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  frontend_skill.associate = function(models) {
    frontend_skill.belongsTo(models.profile, {
      onDelete: "cascade"
    });
  };


  return frontend_skill;
};
