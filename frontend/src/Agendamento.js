import React, { useState, useEffect } from 'react';
import { API_CONFIG, apiRequest } from './config';

function Agendamento() {
  const [clientes, setClientes] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    apiRequest(`${API_CONFIG.baseURL}/clientes`)
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(() => setClientes([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    try {
      const response = await apiRequest(`${API_CONFIG.baseURL}/agendamentos`, {
        method: 'POST',
        body: JSON.stringify({
          cliente_id: clienteId,
          data,
          hora,
          descricao,
          valor
        })
      });
      if (response.ok) {
        setMensagem('Agendamento realizado com sucesso!');
        setClienteId(''); setData(''); setHora(''); setDescricao(''); setValor('');
      } else {
        setMensagem('Erro ao agendar.');
      }
    } catch (err) {
      setMensagem('Erro de conexão com o servidor.');
    }
  };

  return (
    <div style={{ 
      maxWidth: 400, 
      margin: '40px auto', 
      padding: 20, 
      background: 'rgba(0, 0, 0, 0.7)', 
      backdropFilter: 'blur(10px)',
      borderRadius: 8, 
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)', 
      color: '#fff',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Agendar Sessão</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Cliente:</label>
          <select 
            value={clienteId} 
            onChange={e => setClienteId(e.target.value)} 
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
          >
            <option value="">Selecione</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Data:</label>
          <input 
            type="date" 
            value={data} 
            onChange={e => setData(e.target.value)} 
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
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Hora:</label>
          <input 
            type="time" 
            value={hora} 
            onChange={e => setHora(e.target.value)} 
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
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Descrição:</label>
          <input 
            value={descricao} 
            onChange={e => setDescricao(e.target.value)} 
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
          <label style={{ display: 'block', marginBottom: 5 }}>Valor (R$):</label>
          <input 
            type="number" 
            step="0.01" 
            value={valor} 
            onChange={e => setValor(e.target.value)} 
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
          Agendar
        </button>
      </form>
      {mensagem && <p style={{ textAlign: 'center', marginTop: 10, color: mensagem.includes('sucesso') ? '#4CAF50' : '#ff6b6b' }}>{mensagem}</p>}
    </div>
  );
}

export default Agendamento; 