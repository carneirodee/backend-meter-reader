'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('customer-address', 
      [
        { 
          address: 'Avenida Manhuaçu, 583',
          district: 'Nova Carapina II',
          city: 'Serra',
          state: 'ES',
          country: 'Brasil',
          postal_code: "29170-176",
          phone: '(27) 99697-0436',
          customer_code: '27a17b78-2f04-4e7e-9c18-d10ebc858d8a',
          createdAt: '2024-09-30T00:06:51.832Z',
          updatedAt: '2024-09-30T00:06:51.832Z'
        },
        {
          address: '2ª Travessa L, 421',
          district: 'Nova Itabuna',
          city: 'Itabuna',
          state: 'BA',
          country: 'Brasil',
          postal_code: "45611-170",
          phone: '(27) 99697-0436',
          customer_code: 'a232044e-2b0f-495a-953a-b8a0d5233b86',
          createdAt: '2024-09-30T00:06:51.832Z',
          updatedAt: '2024-09-30T00:06:51.832Z'
        },
        {
          address: 'Rua 313, 347',
          district: 'Loteamento Jardim Catalão',
          city: 'Catalão',
          state: 'GO',
          country: 'Brasil',
          postal_code: "75708-210",
          phone: '(64) 98903-5894',
          customer_code: '299394b2-92c3-47c8-9271-a6cd08363174',
          createdAt: '2024-09-30T00:06:51.832Z',
          updatedAt: '2024-09-30T00:06:51.832Z'
        },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('customer-address', null, {});
  }
};
