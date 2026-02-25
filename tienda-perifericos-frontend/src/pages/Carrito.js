import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Carrito.css';

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerCarrito = async () => {
      try {
        const res = await api.get('/carrito');
        setCarrito(res.data.items || []);
      } catch (err) {
        console.log('Error al obtener carrito', err);
      }
    };
    obtenerCarrito();
  }, []);

  const eliminarProducto = async (productoId) => {
    try {
      await api.delete(`/carrito/${productoId}`);
      setCarrito(carrito.filter(item => item.producto._id !== productoId));
    } catch (err) {
      console.log('Error al eliminar producto', err);
    }
  };

  const vaciarCarrito = async () => {
    try {
      await api.delete('/carrito');
      setCarrito([]);
    } catch (err) {
      console.log('Error al vaciar carrito', err);
    }
  };

  const total = carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);

  return (
    <div className="carrito-container">
      <nav className="carrito-navbar">
        <span className="carrito-logo">⌨️ TechPeripherals</span>
        <button className="carrito-btn-regresar" onClick={() => navigate('/tienda')}>← Regresar a la tienda</button>
      </nav>
      <div className="carrito-content">
        <h1 className="carrito-titulo">Mi Carrito</h1>
        {carrito.length === 0 ? (
          <p className="carrito-vacio">Tu carrito está vacío</p>
        ) : (
          <div>
            {carrito.map((item) => (
              <div key={item.producto._id} className="carrito-item">
                <img src={item.producto.imagen} alt={item.producto.nombre} />
                <div className="carrito-item-info">
                  <span className="carrito-item-nombre">{item.producto.nombre}</span>
                  <span className="carrito-item-cantidad">Cantidad: {item.cantidad}</span>
                  <span className="carrito-item-precio">${item.producto.precio}</span>
                </div>
                <button className="carrito-btn-eliminar" onClick={() => eliminarProducto(item.producto._id)}>
                  Eliminar
                </button>
              </div>
            ))}
            <div className="carrito-footer">
              <p className="carrito-total">Total: <span>${total}</span></p>
              <button className="carrito-btn-vaciar" onClick={vaciarCarrito}>Vaciar carrito</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carrito;