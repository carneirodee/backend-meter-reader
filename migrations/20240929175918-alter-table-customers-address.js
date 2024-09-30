'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('customer-address', 'customer_code' ,{
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'customer',
        key: 'customer_code'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("customer-address", "customer_code");
  }
};
