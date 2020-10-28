'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Pets', 'userId', {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
