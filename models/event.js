'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    petId: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    Event.belongsTo(models.Pet, {foreignKey: 'petId', as: 'pet'});
  };
  return Event;
};