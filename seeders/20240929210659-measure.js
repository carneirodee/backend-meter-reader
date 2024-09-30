'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('measure', 
      [
        { 
          measure_uuid: '41c06c38-1a00-4f7f-b11b-852ebc98eabd',
          measure_datetime: '2024-08-01 00:00:01',
          measure_type: 'WATER',
          measure_value: '',
          has_confirmed: '0',
          image_url: '',
          customer_code: '27a17b78-2f04-4e7e-9c18-d10ebc858d8a',
          createdAt: '2024-09-30T00:06:51.832Z',
          updatedAt: '2024-09-30T00:06:51.832Z'
        },
        {
          measure_uuid: '836fff59-19f3-468b-92f3-9f715a5532ef',
          measure_datetime: '2024-07-01 00:00:01',
          measure_type: 'WATER',
          measure_value: '',
          has_confirmed: '1',
          image_url: '',
          customer_code:'27a17b78-2f04-4e7e-9c18-d10ebc858d8a',
          createdAt: '2024-09-30T00:06:51.832Z',
          updatedAt: '2024-09-30T00:06:51.832Z'
        },
        {
          measure_uuid: '45a63d55-822a-4603-8d6e-c7d7a8b98ae0',
          measure_datetime: '2024-07-01 00:00:01',
          measure_type: 'GAS',
          measure_value: '',
          has_confirmed: '1',
          image_url: '',
          customer_code: 'a232044e-2b0f-495a-953a-b8a0d5233b86',
          createdAt: '2024-09-30T00:06:51.832Z',
          updatedAt: '2024-09-30T00:06:51.832Z'
        },
        {
          measure_uuid: '3f9aac54-0b7d-44b7-be37-5c0299ed4372',
          measure_datetime: '2024-08-27 20:04:00',
          measure_type: 'WATER',
          measure_value: '111',
          has_confirmed: '0',
          image_url: '',
          customer_code: 'b7aff977-741b-49e4-92f2-40775f01a567',
          createdAt: '2024-09-30T00:06:51.832Z',
          updatedAt: '2024-09-30T00:06:51.832Z'
        },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('measure', null, {});
  }
};
