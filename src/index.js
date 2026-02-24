const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const productoRoutes = require('./routes/productoRoutes');
const carritoRoutes = require('./routes/carritoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  family: 4
})
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((err) => console.log('Error de conexión:', err));

app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/carrito', carritoRoutes);

app.get('/', (req, res) => {
  res.send('Tienda de Periféricos API funcionando!');
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});

module.exports = app;