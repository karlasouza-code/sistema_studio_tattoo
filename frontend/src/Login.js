import React, { useState } from 'react';

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      await onLogin(usuario, senha);
    } catch {
      setErro('Usuário ou senha inválidos');
    }
  };

  return (
    <div style={{ 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'none',
    }}>
      <div style={{ 
        maxWidth: 350, 
        margin: '80px auto', 
        padding: 24, 
        background: 'rgba(0, 0, 0, 0.7)', 
        backdropFilter: 'blur(10px)',
        borderRadius: 10, 
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)', 
        color: '#fff',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 20, marginTop: 0, fontSize: '1.2rem' }}>Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5 }}>Usuário:</label>
            <input 
              value={usuario} 
              onChange={e => setUsuario(e.target.value)} 
              required 
              style={{ 
                width: '100%', 
                padding: 12, 
                borderRadius: 5, 
                border: 'none', 
                background: '#fff', 
                color: '#181818',
                boxSizing: 'border-box'
              }} 
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 5 }}>Senha:</label>
            <input 
              type="password" 
              value={senha} 
              onChange={e => setSenha(e.target.value)} 
              required 
              style={{ 
                width: '100%', 
                padding: 12, 
                borderRadius: 5, 
                border: 'none', 
                background: '#fff', 
                color: '#181818',
                boxSizing: 'border-box'
              }} 
            />
          </div>
          <button 
            type="submit" 
            style={{ 
              width: '100%',
              padding: 12, 
              borderRadius: 5,
              border: 'none',
              background: 'rgba(255, 255, 255, 0.2)',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 'bold'
            }}
          >
            Entrar
          </button>
        </form>
        {erro && <p style={{ color: '#ff6b6b', textAlign: 'center', marginTop: 10 }}>{erro}</p>}
      </div>
    </div>
  );
}

export default Login; 