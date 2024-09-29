// import request from "supertest"
// import app from '../app';

// describe('PATCH - Confirming measure value or updating value', () => {
//   it('should return status 200 and success', async () => {
//     const res = await request(app)
//       .patch('/confirm/')
//       .send({
//         measure_uuid: "41c06c38-1a00-4f7f-b11b-852ebc98eabd",
//         confirmed_value: 1
//       })
//     expect(res.statusCode).toEqual(200)
//     expect(res.body.success).toBe(true);

//   })

//   it('should return status 400 - Invalid data', async () => {
//     const res = await request(app)
//       .patch('/confirm')
//       .send({
//         measure_uuid: "836fff59-19f3-468b-92f3-9f715a5532ef",
//         confirmed_value: 8
//       })
//     expect(res.statusCode).toEqual(400)
//     expect(res.body.error_code).toBe('INVALID_DATA');
//     expect(res.body.error_description).toBe('Dados invalidos')

//   })

//   it('should return status 404 - Measure not found', async () => {
//     const res = await request(app)
//       .patch('/confirm')
//       .send({
//         measure_uuid: "418e602a-5bad-4043-91aa-063d3ebb84ed",
//         confirmed_value: 1
//       })
//     expect(res.statusCode).toEqual(400)
//     expect(res.body.error_code).toBe('MEASURE_NOT_FOUND');
//     expect(res.body.error_description).toBe("Leitura não existe")

//   })

//   it('should return status 404 - Confirmation duplicate', async () => {
//     const res = await request(app)
//       .patch('/confirm')
//       .send({
//         measure_uuid: "41c06c38-1a00-4f7f-b11b-852ebc98eabd",
//         confirmed_value: 1
//       })
//     expect(res.statusCode).toEqual(409)
//     expect(res.body.error_code).toBe('CONFIRMATION_DUPLICATE');
//     expect(res.body.error_description).toBe("Leitura do mês já realizada")

//   })

// });

