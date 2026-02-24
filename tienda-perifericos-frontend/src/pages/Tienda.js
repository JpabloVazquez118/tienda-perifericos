import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Tienda.css';

function Tienda() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();
  const nombre = localStorage.getItem('nombre');

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await api.get('/productos');
        setProductos(res.data);
      } catch (err) {
        console.log('Error al obtener productos', err);
      }
    };
    obtenerProductos();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const agregarAlCarrito = async (productoId) => {
    try {
      await api.post('/carrito', { productoId, cantidad: 1 });
      alert('Producto agregado al carrito!');
    } catch (err) {
      console.log('Error al agregar al carrito', err);
    }
  };

  return (
    <div className="tienda-container">
      <nav className="tienda-navbar">
        <span className="tienda-logo">⌨️ TechPeripherals</span>
        <div className="tienda-nav-right">
          <span className="tienda-saludo">Hola, {nombre}!</span>
          <button className="tienda-btn-carrito" onClick={() => navigate('/carrito')}>🛒 Carrito</button>
          <button className="tienda-btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </nav>
      <div className="tienda-content">
        <h1 className="tienda-titulo">Nuestros Productos</h1>
        <div className="tienda-grid">
          {productos.map((producto) => (
            <div key={producto._id} className="tienda-card">
              <img src={producto.imagen} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p className="tienda-card-precio">${producto.precio}</p>
              <p className="tienda-card-stock">Stock: {producto.stock}</p>
              <button className="tienda-btn-agregar" onClick={() => agregarAlCarrito(producto._id)}>
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tienda;