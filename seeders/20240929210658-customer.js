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
          password: "eIO8dOzxhP",
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
          password: "s2BFPp7Oa7",
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
          password: "5gB4LmCiRP",
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
          password: "2ZtxrW8zsS",
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
