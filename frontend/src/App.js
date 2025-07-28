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
import './App.css';

function App() {
  const [tela, setTela] = useState('home');
  const [logado, setLogado] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [precisaTrocarSenha, setPrecisaTrocarSenha] = useState(false);

  // Após login, usar tipo retornado pelo backend
  const handleLogin = async (usuario, senha) => {
    const res = await fetch('http://localhost:3001/login', {
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

  if (!logado) {
    return <Login onLogin={handleLogin} />;
  }

  if (precisaTrocarSenha) {
    return <TrocarSenha onTrocaSenha={() => setPrecisaTrocarSenha(false)} />;
  }

  return (
    <div className="App">
      <Menu onNavigate={setTela} tipoUsuario={tipoUsuario} />
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
