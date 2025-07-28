import React, { useEffect, useState } from 'react';

function ListaAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/agendamentos')
      .then(res => res.json())
      .then(data => {
        setAgendamentos(data);
        setCarregando(false);
      })
      .catch(() => setCarregando(false));
  }, []);

  return (
    <div style={{ 
      maxWidth: 700, 
      margin: '40px auto', 
      padding: 20, 
      background: 'rgba(0, 0, 0, 0.7)', 
      backdropFilter: 'blur(10px)',
      borderRadius: 8, 
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)', 
      color: '#fff',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Agendamentos</h2>
      {carregando ? (
        <p style={{ textAlign: 'center' }}>Carregando...</p>
      ) : agendamentos.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Nenhum agendamento encontrado.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.3)', padding: 12, textAlign: 'left' }}>Cliente</th>
              <th style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.3)', padding: 12, textAlign: 'left' }}>Telefone</th>
              <th style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.3)', padding: 12, textAlign: 'left' }}>Data</th>
              <th style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.3)', padding: 12, textAlign: 'left' }}>Hora</th>
              <th style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.3)', padding: 12, textAlign: 'left' }}>Descrição</th>
              <th style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.3)', padding: 12, textAlign: 'left' }}>Valor (R$)</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map(a => (
              <tr key={a.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <td style={{ padding: 12 }}>{a.nome}</td>
                <td style={{ padding: 12 }}>{a.telefone}</td>
                <td style={{ padding: 12 }}>{a.data}</td>
                <td style={{ padding: 12 }}>{a.hora}</td>
                <td style={{ padding: 12 }}>{a.descricao}</td>
                <td style={{ padding: 12 }}>{a.valor ? Number(a.valor).toFixed(2) : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListaAgendamentos; 