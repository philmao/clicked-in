module.exports = function(sequelize, DataTypes) {
  var backend_skill = sequelize.define("backend_skill", {
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
    }
  }, {
    timestamps: false
  });


  backend_skill.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    backend_skill.belongsTo(models.profile, {
      onDelete: "cascade"
    });
  };


  return backend_skill;
};
