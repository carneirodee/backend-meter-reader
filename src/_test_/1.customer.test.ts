import request from "supertest"
import app from '../app';
import imagesBase64 from '../assets/image';

describe('POST - Creating a Customer Profile', () => {
    it('should return status 200', async () => {
        const res = await request(app)
            .post('/customers')
            .send({
                code: '214.968.377-62',
                name: 'Giovana Isabelle Sarah Ferreira',
                email: 'giovanaisabela@email.com',
                password: "test",
                profile_picture: '',
                address: 'Rua São Geraldo, 213',
                city: 'Juazeiro do Norte',
                district: 'Pio XII',
                contry: 'Brasil',
                state: 'BA',
                postal_code: '63020-496'
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });

    it('should return status 400 - Invalid CPF', async () => {
        const res = await request(app)
            .post('/customers')
            .send({
                code: '076.514.063-25',
                name: 'Liz Hadassa das Neves',
                email: 'lizhadassa@email.com',
                password: "test",
                profile_picture: imagesBase64[2],
                address: 'Rua São Geraldo, 213',
                city: 'Juazeiro do Norte',
                district: 'Pio XII',
                contry: 'Brasil',
                state: 'BA',
                postal_code: '63020-496'
            })
        expect(res.statusCode).toEqual(400);
    });

});

describe('PUT - Updating a Customer Profile', () => {
    it('should return status 200 - Updating Password', async () => {
        const customer_code = '27a17b78-2f04-4e7e-9c18-d10ebc858d8a';
        const res = await request(app)
            .put(`/customers/${customer_code}`)
            .send({
                code: '214.968.377-62',
                name: 'Isis Mariane Valentina Figueiredo',
                email: 'isis.mariane.figueiredo@hotmai.com.br',
                password: "test",
                profile_picture: '',
                address: 'Rua São Geraldo, 213',
                city: 'Juazeiro do Norte',
                district: 'Pio XII',
                contry: 'Brasil',
                state: 'BA',
                postal_code: '63020-496',
                phone: '(27) 99697-0436'
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });

    it('should return status 404', async () => {
        const customer_code = '446e322d-45a7-4110-ad48-48b1f60bab13';
        const res = await request(app)
            .put(`/customers/${customer_code}`)
            .send({
                code: '214.968.377-62',
                name: 'Giovana Isabelle Sarah Ferreira',
                email: 'giovanaisabele@email.com',
                password: "test",
                profile_picture: '',
                address: 'Rua São Geraldo, 213',
                city: 'Juazeiro do Norte',
                district: 'Pio XII',
                contry: 'Brasil',
                state: 'BA',
                postal_code: '63020-496',
                phone: '(27) 99697-0436'
            })
        expect(res.statusCode).toEqual(404);
    });
});

describe('GET - Getting a Customer Profile', () => {
    it('should return status 200', async () => {
        const customer_code = 'a232044e-2b0f-495a-953a-b8a0d5233b86';
        const res = await request(app)
            .get(`/customers/${customer_code}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.customer_code).toBe(customer_code);
    });

    it('should return status 404 - Invalid customer code', async () => {
        const customer_code = '7a80780a-af63-4492-b95c-f24458afaade';
        const res = await request(app)
            .get(`/customers/${customer_code}`);
        expect(res.statusCode).toEqual(404);
    });
});

describe('DELETE - Deleting a Customer Profile', () => {
    it('should return status 200', async () => {
        const customer_code = '84ed5afe-fc7e-4abd-b50b-9d24a8869851';
        const res = await request(app)
            .delete(`/customers/${customer_code}`);
        expect(res.statusCode).toEqual(200);
    });

    it('should return status 404 - Invalid customer code', async () => {
        const customer_code = '1cf29beb-ac19-4e74-83d8-b46596200e74';
        const res = await request(app)
            .delete(`/customers/${customer_code}`);
        expect(res.statusCode).toEqual(404);
    });
});

