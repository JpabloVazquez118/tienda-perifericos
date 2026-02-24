const express = require('express');
const router = express.Router();
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/productoController');
const { verificarToken, soloAdmin } = require('../middleware/auth');

// Rutas públicas
router.get('/', obtenerProductos);
router.get('/:id', obtenerProducto);

// Rutas solo admin
router.post('/', verificarToken, soloAdmin, crearProducto);
router.put('/:id', verificarToken, soloAdmin, actualizarProducto);
router.delete('/:id', verificarToken, soloAdmin, eliminarProducto);

module.exports = router;