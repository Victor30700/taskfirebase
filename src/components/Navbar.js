import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';


const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Tareas Firebase</h1>
      <div className="links">
        <Link to="/">Inicio</Link>
        <Link to="/edit">Editar Tareas</Link>
      </div>
    </nav>
  );
};

export default Navbar;
