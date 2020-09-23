'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'isVerified', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'verificationCode', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'isVerified'),
      queryInterface.removeColumn('Users', 'verificationCode'),
    ]);
  },
};
