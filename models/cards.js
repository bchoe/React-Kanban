module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("Cards", {
    title:DataTypes.STRING,
    priority:DataTypes.STRING,
    createdBy:DataTypes.STRING,
    assignedBy:DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return User;
};