const Carrito = require('../models/carrito');

// Obtener carrito del usuario
const obtenerCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.findOne({ usuario: req.usuario.id })
      .populate('items.producto');
    if (!carrito) {
      return res.json({ items: [] });
    }
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener carrito', error });
  }
};

// Agregar producto al carrito
const agregarAlCarrito = async (req, res) => {
  try {
    const { productoId, cantidad } = req.body;

    let carrito = await Carrito.findOne({ usuario: req.usuario.id });

    if (!carrito) {
      carrito = new Carrito({ usuario: req.usuario.id, items: [] });
    }

    const itemExiste = carrito.items.find(
      item => item.producto.toString() === productoId
    );

    if (itemExiste) {
      itemExiste.cantidad += cantidad || 1;
    } else {
      carrito.items.push({ producto: productoId, cantidad: cantidad || 1 });
    }

    await carrito.save();
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar al carrito', error });
  }
};

// Eliminar producto del carrito
const eliminarDelCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.findOne({ usuario: req.usuario.id });
    if (!carrito) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    carrito.items = carrito.items.filter(
      item => item.producto.toString() !== req.params.productoId
    );

    await carrito.save();
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar del carrito', error });
  }
};

// Vaciar carrito
const vaciarCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.findOne({ usuario: req.usuario.id });
    if (!carrito) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    carrito.items = [];
    await carrito.save();
    res.json({ mensaje: 'Carrito vaciado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al vaciar carrito', error });
  }
};

module.exports = { obtenerCarrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito };