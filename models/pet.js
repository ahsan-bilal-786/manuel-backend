'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define('Pet', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    height: DataTypes.FLOAT,
    weight: DataTypes.FLOAT,
    dob: DataTypes.DATE,
    petType: DataTypes.ENUM("cats","dogs","birds","rabbits","guinea pigs","fish"),
  }, {});
  Pet.associate = function(models) {
    // associations can be defined here
    Pet.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
  };
  return Pet;
};