module.exports = function(sequelize, DataTypes) {
  var design_skills = sequelize.define("design_skills", {
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

  design_skills.associate = function(models) {
    // Associating Profile with skills
    // When an Profile is deleted, also delete any associated skills
    design_skills.belongsTo(models.profile, {
      onDelete: "cascade"
    });
  };

  
  return design_skills;
};