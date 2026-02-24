import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Tienda from './pages/Tienda';
import Carrito from './pages/Carrito';
import Admin from './pages/Admin';

function ProtectedRoute({ children, rol }) {
  const token = localStorage.getItem('token');
  const rolGuardado = localStorage.getItem('rol');
  if (!token) return <Navigate to="/" />;
  if (rol && rolGuardado !== rol) return <Navigate to="/tienda" />;
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tienda" element={
          <ProtectedRoute>
            <Tienda />
          </ProtectedRoute>
        } />
        <Route path="/carrito" element={
          <ProtectedRoute>
            <Carrito />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute rol="admin">
            <Admin />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
