import React, { useState } from 'react';
import { API_CONFIG, apiRequest } from './config';

function TrocarSenha({ onTrocaSenha }) {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    if (novaSenha.length < 4) {
      setMensagem('A senha deve ter pelo menos 4 caracteres.');
      return;
    }
    if (novaSenha !== confirmar) {
      setMensagem('As senhas não coincidem.');
      return;
    }
    try {
      const res = await apiRequest(`${API_CONFIG.baseURL}/alterar-senha`, {
        method: 'POST',
        body: JSON.stringify({ novaSenha })
      });
      if (res.ok) {
        setMensagem('Senha alterada com sucesso!');
        onTrocaSenha();
      } else {
        setMensagem('Erro ao alterar senha.');
      }
    } catch {
      setMensagem('Erro de conexão.');
    }
  };

  return (
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
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Troca de Senha Obrigatória</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Nova senha:</label>
          <input 
            type="password" 
            value={novaSenha} 
            onChange={e => setNovaSenha(e.target.value)} 
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
          <label style={{ display: 'block', marginBottom: 5 }}>Confirmar nova senha:</label>
          <input 
            type="password" 
            value={confirmar} 
            onChange={e => setConfirmar(e.target.value)} 
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
          Alterar Senha
        </button>
      </form>
      {mensagem && <p style={{ textAlign: 'center', marginTop: 10, color: mensagem.includes('sucesso') ? '#4CAF50' : '#ff6b6b' }}>{mensagem}</p>}
    </div>
  );
}

export default TrocarSenha; 