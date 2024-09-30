'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('measure', {
      measure_uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      measure_datetime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      measure_value: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      measure_type: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      customer_code: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      has_confirmed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      image_url: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('measure');
  }
};
