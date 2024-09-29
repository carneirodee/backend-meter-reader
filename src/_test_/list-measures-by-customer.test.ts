import request from "supertest"
import app from '../app';

describe('GET - Getting all measures from a customer', () => {
  it('should return status 200', async () => {
    const customer_code = 1;
    const res = await request(app)
      .get(`/${customer_code}/list`)
    expect(res.statusCode).toEqual(200)

  });

  it('should return status 400', async () => {
    const customer_code = 1;
    const res = await request(app)
      .get(`/${customer_code}/list?measure_type=ENERGY`)
    expect(res.statusCode).toEqual(400)
    expect(res.body.error_code).toBe('INVALID_TYPE');
    expect(res.body.error_description).toBe("Tipo de medição não permitida");
  })

  it('should return status 404', async () => {
    const customer_code = 1;
    const res = await request(app)
      .get(`/${customer_code}/list`)
    expect(res.statusCode).toEqual(404)
    expect(res.body.error_code).toBe('MEASURES_NOT_FOUND');
    expect(res.body.error_description).toBe("Nenhuma leitura encontrada");
  })

  it('should return status 404', async () => {
    const customer_code = 1;
    const res = await request(app)
      .get(`/${customer_code}/list`)
    expect(res.statusCode).toEqual(404)
    expect(res.body.error_code).toBe('CUSTOMER_NOT_FOUND');
    expect(res.body.error_description).toBe("Cliente não encontrado");
  })

});
