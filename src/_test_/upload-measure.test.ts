// import request from "supertest"
// import app from '../app';
// import imagesBase64 from '../assets/image';

// describe('POST - Posting Image and Analyzing with Gemini', () => {
//   it('should return status 200', async () => {
//     const res = await request(app)
//       .post('/upload')
//       .send({
//         image: imagesBase64[0],
//         customer_code: '1',
//         measure_datetime: "2024-08-27 20:04:00",
//         measure_type: "WATER"
//       })
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('image_url');
//     expect(res.body).toHaveProperty('measure_value');
//     expect(res.body).toHaveProperty('measure_uuid');
//   })

//   it('should return an error 400 [INVALID_DATA] - Invalid image type', async () => {
//     const res = await request(app)
//       .post('/upload')
//       .send({
//         image: "It isn't a image in base 64, is a simple string",
//         customer_code: '1',
//         measure_datetime: "2024-09-27 20:04:00",
//         measure_type: "GAS"
//       })
//     expect(res.statusCode).toEqual(400);
//     expect(res.body.error_code).toBe('INVALID_DATA');
//     expect(res.body.error_description).toBe('Imagem invalida')

//   })

//   it('should return an error 400 [INVALID_DATA] - Datime invalid', async () => {
//     const res = await request(app)
//       .post('/upload')
//       .send({
//         image: imagesBase64[1],
//         customer_code: '1',
//         measure_datetime: "",
//         measure_type: "GAS"
//       })
//     expect(res.statusCode).toEqual(400);
//     expect(res.body.error_code).toBe('INVALID_DATA');
//     expect(res.body.error_description).toBe('Data invalida')
//   })

//   it('should return an error 400 [INVALID_DATA] - Invalid measure type', async () => {
//     const res = await request(app)
//       .post('/upload')
//       .send({
//         image: imagesBase64[1],
//         customer_code: '1',
//         measure_datetime: "2024-09-27 20:04:00",
//         measure_type: "ENERGY"
//       })
//     expect(res.statusCode).toEqual(400);
//     expect(res.body.error_code).toBe('INVALID_DATA');
//     expect(res.body.error_description).toBe('Tipo de leitura invalida')
//   })

//   it('should return an error 400 [INVALID_DATA] - Invalid customer code', async () => {
//     const res = await request(app)
//       .post('/upload')
//       .send({
//         image: imagesBase64[0],
//         customer_code: '',
//         measure_datetime: "2024-09-27 20:04:00",
//         measure_type: "WATER"
//       })
//     expect(res.statusCode).toEqual(400);
//     expect(res.body.error_code).toBe('INVALID_DATA');
//     expect(res.body.error_description).toBe('Código de Cliente invalido')
//   })

//   it('should return an error 409 [DOUBLE_REPORT] - Already measured ', async () => {
//     const res = await request(app)
//       .post('/upload')
//       .send({
//         image: imagesBase64[0],
//         customer_code: '0',
//         measure_datetime: "2024-08-27 20:04:00",
//         measure_type: "WATER"
//       })
//     expect(res.statusCode).toEqual(409);
//     expect(res.body.error_code).toBe('DOUBLE_REPORT');
//     expect(res.body.error_description).toBe("Leitura do mês já realizada");

//   })
// });

// export { };
