// Configuração da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  endpoints: {
    login: '/login',
    logout: '/logout',
    clientes: '/clientes',
    agendamentos: '/agendamentos',
    usuarios: '/usuarios',
    cep: '/cep',
    alterarSenha: '/alterar-senha',
    resetarSenha: '/usuarios',
    permissao: '/usuarios',
    resumo: '/resumo',
    redesSociais: '/redes-sociais'
  }
};

export default API_CONFIG; 