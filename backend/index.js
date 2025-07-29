require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors({
  origin: ['http://localhost:3002', 'http://localhost:3000', 'https://*.vercel.app', 'https://*.railway.app'],
  credentials: true
}));
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER || 'tattoo',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'tattoo_studio',
  password: process.env.DB_PASS || 'tattoo123',
  port: process.env.DB_PORT || 5432,
});

// Usuário e senha fixos para autenticação simples
const USUARIO = process.env.USUARIO || 'admin';
const SENHA = process.env.SENHA || '1234';

// Middleware de autenticação
function autenticar(req, res, next) {
  if (req.session && req.session.logado) {
    next();
  } else {
    res.status(401).json({ erro: 'Não autorizado' });
  }
}

// Middleware para checar admin
function apenasAdmin(req, res, next) {
  if (req.session && req.session.logado && req.session.tipo === 'admin') {
    next();
  } else {
    res.status(403).json({ erro: 'Apenas admin pode acessar' });
  }
}

const session = require('express-session');
app.use(session({
  secret: process.env.SESSION_SECRET || 'tattoo_secret',
  resave: false,
  saveUninitialized: true,
}));

// Rota de login (atualizada para usuários do banco)
app.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;
  // Login fixo admin
  if (usuario === USUARIO && senha === SENHA) {
    req.session.logado = true;
    req.session.tipo = 'admin';
    req.session.usuario = usuario;
    res.json({ sucesso: true, tipo: 'admin', precisaTrocarSenha: false });
    return;
  }
  // Login de usuário do banco
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE usuario = $1', [usuario]);
    if (result.rows.length === 0) return res.status(401).json({ erro: 'Usuário ou senha inválidos' });
    const user = result.rows[0];
    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) return res.status(401).json({ erro: 'Usuário ou senha inválidos' });
    req.session.logado = true;
    req.session.tipo = user.tipo;
    req.session.usuario = usuario;
    res.json({ sucesso: true, tipo: user.tipo, precisaTrocarSenha: user.precisatrocarsenha });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Rota de logout
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ sucesso: true });
});

// Rota para cadastrar cliente
app.post('/clientes', async (req, res) => {
  const { nome, telefone, email, cpf, data_nascimento, cep, endereco } = req.body;
  
  // Validar se é maior de idade
  if (data_nascimento) {
    const hoje = new Date();
    const nascimento = new Date(data_nascimento);
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    
    if (idade < 18) {
      return res.status(400).json({ error: 'Cliente deve ser maior de 18 anos para fazer tatuagem' });
    }
  }
  
      try {
      const result = await pool.query(
        'INSERT INTO clientes (nome, telefone, email, cpf, data_nascimento, cep, endereco) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [nome, telefone, email, cpf, data_nascimento, cep, endereco]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
    if (err.code === '23505') { // Código de erro para violação de unique constraint
      res.status(400).json({ error: 'CPF já cadastrado' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

// Rota para agendar horário
app.post('/agendamentos', async (req, res) => {
  const { cliente_id, data, hora, descricao, valor } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO agendamentos (cliente_id, data, hora, descricao, valor) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [cliente_id, data, hora, descricao, valor]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para listar agendamentos
app.get('/agendamentos', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT a.*, c.nome, c.telefone FROM agendamentos a JOIN clientes c ON a.cliente_id = c.id ORDER BY data, hora'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para listar usuários (apenas admin)
app.get('/usuarios', autenticar, apenasAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nome, usuario, tipo FROM usuarios ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Rota para criar usuário (apenas admin)
app.post('/usuarios', autenticar, apenasAdmin, async (req, res) => {
  const { nome, usuario, senha, tipo } = req.body;
  try {
    const hash = await bcrypt.hash(senha, 10);
    const precisaTrocarSenha = senha === '1234';
    const result = await pool.query(
      'INSERT INTO usuarios (nome, usuario, senha, tipo, precisaTrocarSenha) VALUES ($1, $2, $3, $4, $5) RETURNING id, nome, usuario, tipo, precisaTrocarSenha',
      [nome, usuario, hash, tipo || 'atendente', precisaTrocarSenha]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Rota para resetar senha (apenas admin)
app.post('/usuarios/:id/resetar-senha', autenticar, apenasAdmin, async (req, res) => {
  const { novaSenha } = req.body;
  const { id } = req.params;
  try {
    const hash = await bcrypt.hash(novaSenha, 10);
    await pool.query('UPDATE usuarios SET senha = $1 WHERE id = $2', [hash, id]);
    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Rota para alterar permissão (apenas admin)
app.post('/usuarios/:id/permissao', autenticar, apenasAdmin, async (req, res) => {
  const { tipo } = req.body;
  const { id } = req.params;
  if (!['admin', 'atendente'].includes(tipo)) {
    return res.status(400).json({ erro: 'Tipo inválido' });
  }
  try {
    await pool.query('UPDATE usuarios SET tipo = $1 WHERE id = $2', [tipo, id]);
    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Rota para alterar senha do próprio usuário
app.post('/alterar-senha', autenticar, async (req, res) => {
  const { novaSenha } = req.body;
  const usuario = req.session.usuario;
  try {
    const hash = await bcrypt.hash(novaSenha, 10);
    await pool.query('UPDATE usuarios SET senha = $1, precisaTrocarSenha = false WHERE usuario = $2', [hash, usuario]);
    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Rota para buscar CEP
app.get('/cep/:cep', async (req, res) => {
  const { cep } = req.params;
  const cepLimpo = cep.replace(/\D/g, '');
  
  if (cepLimpo.length !== 8) {
    return res.status(400).json({ error: 'CEP deve ter 8 dígitos' });
  }
  
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    const data = await response.json();
    
    if (data.erro) {
      return res.status(404).json({ error: 'CEP não encontrado' });
    }
    
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar CEP' });
  }
});

// Rota de health check para Railway
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 