const Producto = require('../models/producto');

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error });
  }
};

// Obtener un producto por ID
const obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener producto', error });
  }
};

// Crear producto (solo admin)
const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria, imagen } = req.body;

    if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });
    if (!descripcion) return res.status(400).json({ error: 'La descripción es obligatoria' });
    if (!precio) return res.status(400).json({ error: 'El precio es obligatorio' });
    if (!stock) return res.status(400).json({ error: 'El stock es obligatorio' });
    if (!categoria) return res.status(400).json({ error: 'La categoría es obligatoria' });
    if (!imagen) return res.status(400).json({ error: 'La imagen es obligatoria' });

    const producto = new Producto({ nombre, descripcion, precio, stock, categoria, imagen });
    await producto.save();
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear producto', error });
  }
};

// Actualizar producto (solo admin)
const actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar producto', error });
  }
};

// Eliminar producto (solo admin)
const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar producto', error });
  }
};

module.exports = { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto };