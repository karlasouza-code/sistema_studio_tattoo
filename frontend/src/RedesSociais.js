import React, { useState, useEffect } from 'react';

function RedesSociais({ usuarioLogado }) {
  const [redesSociais, setRedesSociais] = useState({
    instagram: '',
    facebook: '',
    whatsapp: ''
  });
  const [editando, setEditando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  // Carregar configurações das redes sociais
  useEffect(() => {
    const salvas = localStorage.getItem('redesSociais');
    if (salvas) {
      setRedesSociais(JSON.parse(salvas));
    }
  }, []);

  const salvarRedesSociais = () => {
    localStorage.setItem('redesSociais', JSON.stringify(redesSociais));
    setMensagem('Redes sociais salvas com sucesso!');
    setEditando(false);
    setTimeout(() => setMensagem(''), 3000);
  };

  const abrirRedeSocial = (tipo) => {
    const url = redesSociais[tipo];
    if (url) {
      window.open(url, '_blank');
    }
  };

  const compartilharAgendamento = (agendamento) => {
    const texto = `🎨 Agendamento confirmado no Jhonny Tattoo Studio!\n📅 Data: ${agendamento.data}\n⏰ Horário: ${agendamento.horario}\n👤 Cliente: ${agendamento.cliente}\n📝 Serviço: ${agendamento.descricao}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Agendamento Jhonny Tattoo Studio',
        text: texto,
        url: redesSociais.instagram || redesSociais.facebook
      });
    } else {
      // Fallback para copiar para área de transferência
      navigator.clipboard.writeText(texto);
      setMensagem('Texto copiado para área de transferência!');
      setTimeout(() => setMensagem(''), 3000);
    }
  };

  return (
    <div style={{ 
      maxWidth: 800, 
      margin: '40px auto', 
      padding: 20, 
      background: 'rgba(0, 0, 0, 0.7)', 
      backdropFilter: 'blur(10px)',
      borderRadius: 12, 
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)', 
      color: '#fff',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Redes Sociais</h2>
      
      {/* Configuração das Redes Sociais */}
      {usuarioLogado?.tipo === 'admin' && (
        <div style={{ marginBottom: 30 }}>
          <h3 style={{ marginBottom: 15 }}>Configurar Links</h3>
          {editando ? (
            <div>
              <div style={{ marginBottom: 15 }}>
                <label style={{ display: 'block', marginBottom: 5 }}>Instagram:</label>
                <input 
                  type="url" 
                  placeholder="https://instagram.com/jhonnytattoo" 
                  value={redesSociais.instagram} 
                  onChange={e => setRedesSociais({...redesSociais, instagram: e.target.value})}
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
                <label style={{ display: 'block', marginBottom: 5 }}>Facebook:</label>
                <input 
                  type="url" 
                  placeholder="https://facebook.com/jhonnytattoo" 
                  value={redesSociais.facebook} 
                  onChange={e => setRedesSociais({...redesSociais, facebook: e.target.value})}
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
                <label style={{ display: 'block', marginBottom: 5 }}>WhatsApp:</label>
                <input 
                  type="text" 
                  placeholder="+55 11 99999-9999" 
                  value={redesSociais.whatsapp} 
                  onChange={e => setRedesSociais({...redesSociais, whatsapp: e.target.value})}
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
              <div style={{ display: 'flex', gap: 10 }}>
                <button 
                  onClick={salvarRedesSociais}
                  style={{ 
                    padding: '10px 20px',
                    borderRadius: 5,
                    border: 'none',
                    background: '#4CAF50',
                    color: '#fff',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Salvar
                </button>
                <button 
                  onClick={() => setEditando(false)}
                  style={{ 
                    padding: '10px 20px',
                    borderRadius: 5,
                    border: 'none',
                    background: '#ff6b6b',
                    color: '#fff',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setEditando(true)}
              style={{ 
                padding: '10px 20px',
                borderRadius: 5,
                border: 'none',
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Editar Links
            </button>
          )}
        </div>
      )}

      {/* Exibição das Redes Sociais */}
      <div style={{ marginBottom: 30 }}>
        <h3 style={{ marginBottom: 15 }}>Acesse Nossas Redes</h3>
        <div style={{ display: 'flex', gap: 15, flexWrap: 'wrap' }}>
          {redesSociais.instagram && (
            <button 
              onClick={() => abrirRedeSocial('instagram')}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 20px',
                borderRadius: 8,
                border: 'none',
                background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 14
              }}
            >
              📸 Instagram
            </button>
          )}
          {redesSociais.facebook && (
            <button 
              onClick={() => abrirRedeSocial('facebook')}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 20px',
                borderRadius: 8,
                border: 'none',
                background: '#1877f2',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 14
              }}
            >
              📘 Facebook
            </button>
          )}
          {redesSociais.whatsapp && (
            <button 
              onClick={() => window.open(`https://wa.me/${redesSociais.whatsapp.replace(/\D/g, '')}`, '_blank')}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 20px',
                borderRadius: 8,
                border: 'none',
                background: '#25d366',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 14
              }}
            >
              💬 WhatsApp
            </button>
          )}
        </div>
      </div>

      {/* Ferramentas de Compartilhamento */}
      <div style={{ marginBottom: 30 }}>
        <h3 style={{ marginBottom: 15 }}>Ferramentas de Marketing</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 15 }}>
          <div style={{ 
            padding: 15, 
            background: 'rgba(255, 255, 255, 0.1)', 
            borderRadius: 8,
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h4 style={{ marginBottom: 10 }}>📱 Compartilhar Agendamento</h4>
            <p style={{ fontSize: 14, marginBottom: 10, opacity: 0.8 }}>
              Compartilhe agendamentos confirmados nas redes sociais
            </p>
            <button 
              onClick={() => compartilharAgendamento({
                data: '15/12/2024',
                horario: '14:00',
                cliente: 'João Silva',
                descricao: 'Tatuagem tribal no braço'
              })}
              style={{ 
                padding: '8px 16px',
                borderRadius: 5,
                border: 'none',
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                cursor: 'pointer',
                fontSize: 12
              }}
            >
              Compartilhar Exemplo
            </button>
          </div>
          
          <div style={{ 
            padding: 15, 
            background: 'rgba(255, 255, 255, 0.1)', 
            borderRadius: 8,
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h4 style={{ marginBottom: 10 }}>📊 Estatísticas</h4>
            <p style={{ fontSize: 14, marginBottom: 10, opacity: 0.8 }}>
              Visualize o engajamento das redes sociais
            </p>
            <div style={{ fontSize: 12, opacity: 0.8 }}>
              <p>📸 Instagram: 1.2k seguidores</p>
              <p>📘 Facebook: 850 curtidas</p>
              <p>💬 WhatsApp: 150 conversas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dicas de Marketing */}
      <div style={{ 
        padding: 15, 
        background: 'rgba(255, 255, 255, 0.05)', 
        borderRadius: 8,
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h4 style={{ marginBottom: 10 }}>💡 Dicas para Redes Sociais</h4>
        <ul style={{ fontSize: 14, opacity: 0.8, paddingLeft: 20 }}>
          <li>Poste fotos dos trabalhos realizados regularmente</li>
          <li>Use hashtags relevantes (#tattoo #tatuagem #jhonnytattoo)</li>
          <li>Interaja com os comentários dos seguidores</li>
          <li>Compartilhe stories do processo de criação</li>
          <li>Faça lives mostrando o trabalho em tempo real</li>
        </ul>
      </div>

      {mensagem && (
        <p style={{ 
          textAlign: 'center', 
          marginTop: 15, 
          padding: 10,
          background: mensagem.includes('sucesso') ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 107, 107, 0.2)',
          borderRadius: 5,
          border: `1px solid ${mensagem.includes('sucesso') ? '#4CAF50' : '#ff6b6b'}`
        }}>
          {mensagem}
        </p>
      )}
    </div>
  );
}

export default RedesSociais; 