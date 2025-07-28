import React, { useEffect, useState } from 'react';

function ResumoDia() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [hoje, setHoje] = useState('');

  useEffect(() => {
    const dataHoje = new Date().toISOString().slice(0, 10);
    setHoje(dataHoje);
    fetch('http://localhost:3001/agendamentos')
      .then(res => res.json())
      .then(data => {
        // Filtra apenas agendamentos do dia
        const agsHoje = data.filter(a => a.data === dataHoje);
        setAgendamentos(agsHoje);
        setCarregando(false);
      })
      .catch(() => setCarregando(false));
  }, []);

  const totalValor = agendamentos.reduce((soma, a) => soma + (Number(a.valor) || 0), 0);

  return (
    <div style={{ 
      maxWidth: 600, 
      margin: '40px auto', 
      padding: 20, 
      background: 'rgba(0, 0, 0, 0.7)', 
      backdropFilter: 'blur(10px)',
      borderRadius: 12, 
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)', 
      color: '#fff',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Resumo do Dia ({hoje.split('-').reverse().join('/')})</h2>
      {carregando ? <p style={{ textAlign: 'center' }}>Carregando...</p> : (
        <>
          <p style={{ marginBottom: 10 }}><b>Total de sessões hoje:</b> {agendamentos.length}</p>
          <p style={{ marginBottom: 20 }}><b>Valor total do dia:</b> R$ {totalValor.toFixed(2)}</p>
          <h3 style={{ textAlign: 'center', marginBottom: 15 }}>Próximos agendamentos</h3>
          {agendamentos.length === 0 ? <p style={{ textAlign: 'center' }}>Nenhum agendamento para hoje.</p> : (
            <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
              {agendamentos.slice(0, 3).map(a => (
                <li key={a.id} style={{ 
                  marginBottom: 10, 
                  padding: 15, 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  border: '1px solid rgba(255, 255, 255, 0.2)', 
                  borderRadius: 8 
                }}>
                  <b>{a.hora}</b> - {a.nome} ({a.telefone})<br />
                  <span style={{ color: '#ccc' }}>{a.descricao}</span> <span style={{ float: 'right' }}>R$ {a.valor ? Number(a.valor).toFixed(2) : '-'}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default ResumoDia; 