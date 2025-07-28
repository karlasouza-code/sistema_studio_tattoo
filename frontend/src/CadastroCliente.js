import React, { useState } from 'react';

function CadastroCliente() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Função para formatar CPF
  const formatarCPF = (valor) => {
    const cpfLimpo = valor.replace(/\D/g, '');
    return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const handleCpfChange = (e) => {
    const valor = e.target.value;
    const cpfFormatado = formatarCPF(valor);
    setCpf(cpfFormatado);
  };

  // Função para formatar CEP
  const formatarCEP = (valor) => {
    const cepLimpo = valor.replace(/\D/g, '');
    return cepLimpo.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const handleCepChange = (e) => {
    const valor = e.target.value;
    const cepFormatado = formatarCEP(valor);
    setCep(cepFormatado);
    
    // Buscar automaticamente quando o CEP estiver completo
    const cepLimpo = valor.replace(/\D/g, '');
    if (cepLimpo.length === 8) {
      setTimeout(() => buscarCep(cepFormatado), 500); // Pequeno delay para melhor UX
    }
  };

  // Função para buscar endereço pelo CEP
  const buscarCep = async (cep) => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length === 8) {
      try {
        const response = await fetch(`http://localhost:3001/cep/${cepLimpo}`);
        if (response.ok) {
          const data = await response.json();
          const enderecoCompleto = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
          setEndereco(enderecoCompleto);
        } else {
          setMensagem('CEP não encontrado.');
        }
      } catch (err) {
        setMensagem('Erro ao buscar CEP.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    
    // Validar CPF (formato básico)
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      setMensagem('CPF deve ter 11 dígitos.');
      return;
    }
    
    // Validar data de nascimento
    if (dataNascimento) {
      const hoje = new Date();
      const nascimento = new Date(dataNascimento);
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const mesAtual = hoje.getMonth();
      const mesNascimento = nascimento.getMonth();
      
      if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
        idade--;
      }
      
      if (idade < 18) {
        setMensagem('Cliente deve ser maior de 18 anos para fazer tatuagem.');
        return;
      }
    }
    
    try {
      const response = await fetch('http://localhost:3001/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nome, 
          telefone, 
          email, 
          cpf: cpfLimpo,
          data_nascimento: dataNascimento,
          cep,
          endereco 
        })
      });
      
      if (response.ok) {
        setMensagem('Cliente cadastrado com sucesso!');
        setNome(''); 
        setTelefone(''); 
        setEmail('');
        setCpf('');
        setDataNascimento('');
        setCep('');
        setEndereco('');
      } else {
        const errorData = await response.json();
        setMensagem(errorData.error || 'Erro ao cadastrar cliente.');
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
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Nome:</label>
          <input 
            value={nome} 
            onChange={e => setNome(e.target.value)} 
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
          <label style={{ display: 'block', marginBottom: 5 }}>Telefone:</label>
          <input 
            value={telefone} 
            onChange={e => setTelefone(e.target.value)} 
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
          <label style={{ display: 'block', marginBottom: 5 }}>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
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
          <label style={{ display: 'block', marginBottom: 5 }}>CPF:</label>
          <input 
            type="text" 
            value={cpf} 
            onChange={handleCpfChange} 
            placeholder="000.000.000-00"
            maxLength="14"
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
          <label style={{ display: 'block', marginBottom: 5 }}>Data de Nascimento:</label>
          <input 
            type="date" 
            value={dataNascimento} 
            onChange={e => setDataNascimento(e.target.value)} 
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
          <label style={{ display: 'block', marginBottom: 5 }}>CEP:</label>
          <div style={{ display: 'flex', gap: 10 }}>
            <input 
              type="text" 
              value={cep} 
              onChange={handleCepChange} 
              placeholder="00000-000"
              maxLength="9"
              required 
              style={{ 
                flex: 1,
                padding: 12, 
                borderRadius: 5, 
                border: 'none', 
                background: '#fff', 
                color: '#181818',
                boxSizing: 'border-box'
              }} 
            />
            <button 
              type="button"
              onClick={() => buscarCep(cep)}
              style={{ 
                padding: '12px 20px',
                borderRadius: 5,
                border: 'none',
                background: 'rgba(255, 255, 255, 0.3)',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Buscar
            </button>
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Endereço:</label>
          <textarea 
            value={endereco} 
            onChange={e => setEndereco(e.target.value)} 
            placeholder="Digite o CEP e clique em Buscar para preenchimento automático"
            required 
            style={{ 
              width: '100%', 
              padding: 12, 
              borderRadius: 5, 
              border: 'none', 
              background: '#fff', 
              color: '#181818',
              boxSizing: 'border-box',
              minHeight: '80px',
              resize: 'vertical'
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
          Cadastrar
        </button>
      </form>
      {mensagem && <p style={{ textAlign: 'center', marginTop: 10, color: mensagem.includes('sucesso') ? '#4CAF50' : '#ff6b6b' }}>{mensagem}</p>}
    </div>
  );
}

export default CadastroCliente; 