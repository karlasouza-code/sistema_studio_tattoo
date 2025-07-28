import React, { useState } from 'react';
import './Menu.css';

function Menu({ onNavigate, tipoUsuario }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="menu">
      <div className="hamburger" onClick={() => setOpen(!open)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      {open && (
        <ul className="menu-list">
          <li onClick={() => { onNavigate('home'); setOpen(false); }}>Home</li>
          <li onClick={() => { onNavigate('cadastro'); setOpen(false); }}>Cadastro de Clientes</li>
          <li onClick={() => { onNavigate('agendamento'); setOpen(false); }}>Agendamento</li>
          <li onClick={() => { onNavigate('lista'); setOpen(false); }}>Lista de Agendamentos</li>
          <li onClick={() => { onNavigate('redes'); setOpen(false); }}>Redes Sociais</li>
          {tipoUsuario === 'admin' && (
            <li onClick={() => { onNavigate('config'); setOpen(false); }}>Configurações</li>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Menu; 