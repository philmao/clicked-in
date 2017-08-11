module.exports = function(sequelize, DataTypes) {
  var Skill = sequelize.define("Skill", {
    // Frontend skills
    front_html: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    front_css: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    front_javascript: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    front_ajax: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    front_jquery: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    front_bootstrap: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    front_react: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    front_angular: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    // Backend skills
    back_mysql: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    back_node: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    back_php: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    back_express: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    back_mongodb: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    back_java: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    back_python: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    back_c_sharp: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    // Design skills
    design_photoshop: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    design_gimp: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    design_illustrator: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    design_inkscape: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    design_coreldraw: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    design_adobe_indesign: {
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