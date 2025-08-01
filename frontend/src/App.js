import React, { useState } from 'react';
import Menu from './Menu';
import CadastroCliente from './CadastroCliente';
import Agendamento from './Agendamento';
import ListaAgendamentos from './ListaAgendamentos';
import ResumoDia from './ResumoDia';
import Login from './Login';
import Configuracoes from './Configuracoes';
import TrocarSenha from './TrocarSenha';
import RedesSociais from './RedesSociais';
import { API_CONFIG } from './config';
import './App.css';

function App() {
  const [tela, setTela] = useState('home');
  const [logado, setLogado] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [precisaTrocarSenha, setPrecisaTrocarSenha] = useState(false);

  // Após login, usar tipo retornado pelo backend
  const handleLogin = async (usuario, senha) => {
    const res = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.login}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ usuario, senha })
    });
    if (res.ok) {
      const data = await res.json();
      setTipoUsuario(data.tipo || 'atendente');
      setPrecisaTrocarSenha(data.precisaTrocarSenha);
      setLogado(true);
    } else {
      throw new Error('Usuário ou senha inválidos');
    }
  };

  // Função de logout
  const handleLogout = async () => {
    try {
      await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.logout}`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.log('Erro no logout:', error);
    }
    setLogado(false);
    setTipoUsuario('');
    setPrecisaTrocarSenha(false);
  };

  if (!logado) {
    return <Login onLogin={handleLogin} />;
  }

  if (precisaTrocarSenha) {
    return <TrocarSenha onTrocaSenha={() => setPrecisaTrocarSenha(false)} />;
  }

  return (
    <div className="App">
      <Menu onNavigate={setTela} tipoUsuario={tipoUsuario} onLogout={handleLogout} />
      {tela === 'home' && <ResumoDia />}
      {tela === 'cadastro' && <CadastroCliente />}
      {tela === 'agendamento' && <Agendamento />}
      {tela === 'lista' && <ListaAgendamentos />}
      {tela === 'redes' && <RedesSociais usuarioLogado={{ tipo: tipoUsuario }} />}
      {tela === 'config' && tipoUsuario === 'admin' && <Configuracoes usuarioLogado={tipoUsuario} />}
    </div>
  );
}

export default App;
