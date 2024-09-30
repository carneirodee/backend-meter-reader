'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('customer', 
      [
        {
          customer_code: '27a17b78-2f04-4e7e-9c18-d10ebc858d8a',
          code: '619.637.158-45',
          name: 'Isis Mariane Valentina Figueiredo',
          email: 'isis.mariane.figueiredo@hotmai.com.br',
          password: "eab5dfa21e723e0ec0e5f273732c328b",
          profile_picture: '',
          is_active: 1,
          createdAt: '2024-09-30T00:06:51.832Z',
          updatedAt: '2024-09-30T00:06:51.832Z'
        },
        {
          customer_code: 'a232044e-2b0f-495a-953a-b8a0d5233b86',
          code: '550.839.899-64',
          name: 'Eliane Raquel Laís Jesus',
          email: 'eliane_raquel_jesus@leoshehtman.com.br',
          password: "4959e6f03d12e3254263cdb058a8f1de",
          profile_picture: '',
          is_active: 1,
          createdAt: '2024-09-30T00:06:51.832Z',
          updatedAt: '2024-09-30T00:06:51.832Z'
        },
        {
          customer_code: '299394b2-92c3-47c8-9271-a6cd08363174',
          code: '874.772.766-75',
          name: 'Aparecida Nina Peixoto',
          email: 'aparecida.nina.peixoto@univap.br',
          password: "3df5174f4ed7633db66cad9f8e587fcf",
          profile_picture: '',
          is_active: 1,
          createdAt: '2024-09-30T00:06:51.832Z',
          updatedAt: '2024-09-30T00:06:51.832Z'
        },
        {
          customer_code: '84ed5afe-fc7e-4abd-b50b-9d24a8869851',
          code: '986.214.492-00',
          name: 'Lara Camila Rayssa da Mota',
          email: 'lara_camila_damota@prohaska.com.br',
          password: "da8f27fec784e76e8c50482c6819abee",
          profile_picture: '',
          is_active: 1,
          createdAt: '2024-09-30T00:06:51.832Z',
          updatedAt: '2024-09-30T00:06:51.832Z'
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('customer', null, {});
  }
};
