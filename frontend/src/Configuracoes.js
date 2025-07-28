import React, { useEffect, useState } from 'react';

function Configuracoes({ usuarioLogado }) {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [novo, setNovo] = useState({ nome: '', usuario: '', senha: '', tipo: 'atendente' });
  const [mensagem, setMensagem] = useState('');

  const fetchUsuarios = () => {
    setCarregando(true);
    fetch('http://localhost:3001/usuarios', { credentials: 'include' })
      .then(res => res.json())
      .then(data => { setUsuarios(data); setCarregando(false); })
      .catch(() => setCarregando(false));
  };

  useEffect(() => { fetchUsuarios(); }, []);

  const criarUsuario = async (e) => {
    e.preventDefault();
    setMensagem('');
    try {
      const res = await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(novo)
      });
      if (res.ok) {
        setMensagem('Usuário criado com sucesso!');
        setNovo({ nome: '', usuario: '', senha: '', tipo: 'atendente' });
        fetchUsuarios();
      } else {
        setMensagem('Erro ao criar usuário.');
      }
    } catch {
      setMensagem('Erro de conexão.');
    }
  };

  const resetarSenha = async (id) => {
    const novaSenha = prompt('Digite a nova senha:');
    if (!novaSenha) return;
    setMensagem('');
    try {
      const res = await fetch(`http://localhost:3001/usuarios/${id}/resetar-senha`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ novaSenha })
      });
      if (res.ok) setMensagem('Senha resetada!');
      else setMensagem('Erro ao resetar senha.');
    } catch {
      setMensagem('Erro de conexão.');
    }
  };

  const alterarPermissao = async (id, tipo) => {
    setMensagem('');
    try {
      const res = await fetch(`http://localhost:3001/usuarios/${id}/permissao`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ tipo })
      });
      if (res.ok) {
        setMensagem('Permissão alterada!');
        fetchUsuarios();
      } else setMensagem('Erro ao alterar permissão.');
    } catch {
      setMensagem('Erro de conexão.');
    }
  };

  return (
    <div style={{ 
      maxWidth: 700, 
      margin: '40px auto', 
      padding: 20, 
      background: 'rgba(0, 0, 0, 0.7)', 
      backdropFilter: 'blur(10px)',
      borderRadius: 12, 
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)', 
      color: '#fff',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Configurações de Usuários</h2>
      <h3 style={{ marginBottom: 15 }}>Criar novo usuário</h3>
      <form onSubmit={criarUsuario} style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 20 }}>
          <input 
            placeholder="Nome" 
            value={novo.nome} 
            onChange={e => setNovo({ ...novo, nome: e.target.value })} 
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
          <input 
            placeholder="Usuário" 
            value={novo.usuario} 
            onChange={e => setNovo({ ...novo, usuario: e.target.value })} 
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
          <input 
            placeholder="Senha" 
            type="password" 
            value={novo.senha} 
            onChange={e => setNovo({ ...novo, senha: e.target.value })} 
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
          <select 
            value={novo.tipo} 
            onChange={e => setNovo({ ...novo, tipo: e.target.value })} 
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
            <option value="atendente">Atendente</option>
            <option value="admin">Admin</option>
          </select>
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
          Criar
        </button>
      </form>
      <h3 style={{ marginBottom: 15 }}>Usuários cadastrados</h3>
      {carregando ? <p style={{ textAlign: 'center' }}>Carregando...</p> : (
        Array.isArray(usuarios) ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.3)', padding: 12, textAlign: 'left' }}>Nome</th>
                <th style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.3)', padding: 12, textAlign: 'left' }}>Usuário</th>
                <th style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.3)', padding: 12, textAlign: 'left' }}>Tipo</th>
                <th style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.3)', padding: 12, textAlign: 'left' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <td style={{ padding: 12 }}>{u.nome}</td>
                  <td style={{ padding: 12 }}>{u.usuario}</td>
                  <td style={{ padding: 12 }}>{u.tipo}</td>
                  <td style={{ padding: 12 }}>
                    <button 
                      onClick={() => resetarSenha(u.id)}
                      style={{ 
                        marginRight: 5,
                        padding: '6px 12px',
                        borderRadius: 3,
                        border: 'none',
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      Resetar Senha
                    </button>
                    {u.tipo === 'admin' ? (
                      <button 
                        onClick={() => alterarPermissao(u.id, 'atendente')}
                        style={{ 
                          padding: '6px 12px',
                          borderRadius: 3,
                          border: 'none',
                          background: 'rgba(255, 255, 255, 0.2)',
                          color: '#fff',
                          cursor: 'pointer'
                        }}
                      >
                        Tornar Atendente
                      </button>
                    ) : (
                      <button 
                        onClick={() => alterarPermissao(u.id, 'admin')}
                        style={{ 
                          padding: '6px 12px',
                          borderRadius: 3,
                          border: 'none',
                          background: 'rgba(255, 255, 255, 0.2)',
                          color: '#fff',
                          cursor: 'pointer'
                        }}
                      >
                        Tornar Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: 'center' }}>Não foi possível carregar os usuários. Verifique se você está logado como admin.</p>
        )
      )}
      {mensagem && <p style={{ textAlign: 'center', marginTop: 10, color: mensagem.includes('sucesso') ? '#4CAF50' : '#ff6b6b' }}>{mensagem}</p>}
    </div>
  );
}

export default Configuracoes; 