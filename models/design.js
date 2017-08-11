module.exports = function(sequelize, DataTypes) {
  var Skill = sequelize.define("Skill", {
    // Frontend skills
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
    },
    // Backend skills
    mysql: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    node: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    php: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    express: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    mongodb: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    java: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    python: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    c_sharp: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    // Design skills
    photoshop: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    gimp: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    illustrator: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    inkscape: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    coreldraw: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    adobe_indesign: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: false
  });

  Skill.associate = function(models) {
    // Associating Profile with skills
    // When an Profile is deleted, also delete any associated skills
    Skill.belongsTo(models.profile, {
      onDelete: "cascade"
    });
  };

  
  return Skill;
};