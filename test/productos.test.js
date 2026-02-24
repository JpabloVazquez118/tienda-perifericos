const request = require('supertest');
const app = require('../src/index');

describe('Pruebas de Productos', () => {
  let token;

  it('GET /api/productos debe retornar lista de productos', async () => {
    const res = await request(app).get('/api/productos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/productos sin token debe retornar 401', async () => {
    const res = await request(app)
      .post('/api/productos')
      .send({ nombre: 'Test' });
    expect(res.statusCode).toBe(401);
  });

  it('Login debe retornar token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@tienda.com', password: 'Admin123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
    console.log('Login response:', res.body);
  });

  it('POST /api/productos sin nombre debe retornar 400', async () => {
    const res = await request(app)
      .post('/api/productos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        descripcion: 'Sin nombre',
        precio: 100,
        stock: 5,
        categoria: 'mouse',
        imagen: 'https://via.placeholder.com/300'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('El nombre es obligatorio');
  });
});