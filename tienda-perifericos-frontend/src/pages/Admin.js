import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Admin.css';

function Admin() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '', stock: '', categoria: 'teclado', imagen: '' });
  const [editandoId, setEditandoId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const res = await api.get('/productos');
      setProductos(res.data);
    } catch (err) {
      console.log('Error al obtener productos', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await api.put(`/productos/${editandoId}`, form);
        setEditandoId(null);
      } else {
        await api.post('/productos', form);
      }
      setForm({ nombre: '', descripcion: '', precio: '', stock: '', categoria: 'teclado', imagen: '' });
      obtenerProductos();
    } catch (err) {
      console.log('Error al guardar producto', err);
    }
  };

  const handleEditar = (producto) => {
    setForm({ nombre: producto.nombre, descripcion: producto.descripcion, precio: producto.precio, stock: producto.stock, categoria: producto.categoria, imagen: producto.imagen });
    setEditandoId(producto._id);
  };

  const handleEliminar = async (id) => {
    try {
      await api.delete(`/productos/${id}`);
      obtenerProductos();
    } catch (err) {
      console.log('Error al eliminar producto', err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="admin-container">
      <nav className="admin-navbar">
        <span className="admin-logo">⌨️ TechPeripherals — Admin</span>
        <button className="admin-btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
      </nav>
      <div className="admin-content">
        <div className="admin-form-section">
          <h2>{editandoId ? '✏️ EDITAR PRODUCTO' : '+ AGREGAR PRODUCTO'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <input className="admin-input" placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
            <input className="admin-input" placeholder="Descripción" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} required />
            <input className="admin-input" placeholder="Precio" type="number" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} required />
            <input className="admin-input" placeholder="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
            <select className="admin-select" value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
              <option value="teclado">Teclado</option>
              <option value="mouse">Mouse</option>
              <option value="audifonos">Audífonos</option>
              <option value="monitor">Monitor</option>
              <option value="webcam">Webcam</option>
              <option value="otro">Otro</option>
            </select>
            <input className="admin-input" placeholder="URL de imagen" value={form.imagen} onChange={(e) => setForm({ ...form, imagen: e.target.value })} required />
            <button type="submit" className="admin-btn-submit">
              {editandoId ? 'GUARDAR CAMBIOS' : 'AGREGAR PRODUCTO'}
            </button>
            {editandoId && (
              <button type="button" className="admin-btn-cancelar" onClick={() => { setEditandoId(null); setForm({ nombre: '', descripcion: '', precio: '', stock: '', categoria: 'teclado', imagen: '' }); }}>
                Cancelar
              </button>
            )}
          </form>
        </div>
        <div className="admin-productos-section">
          <h2>📦 PRODUCTOS</h2>
          <div className="admin-grid">
            {productos.map((producto) => (
              <div key={producto._id} className="admin-card">
                <img src={producto.imagen} alt={producto.nombre} />
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <p className="admin-card-precio">${producto.precio}</p>
                <p>Stock: {producto.stock}</p>
                <p className="admin-card-categoria">#{producto.categoria}</p>
                <div className="admin-card-btns">
                  <button className="admin-btn-editar" onClick={() => handleEditar(producto)}>Editar</button>
                  <button className="admin-btn-eliminar" onClick={() => handleEliminar(producto._id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;