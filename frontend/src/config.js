// Configuração da API
const API_BASE_URL = 'https://tattoo-backend-jhar.onrender.com';

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

// Função utilitária para fazer requisições com headers padronizados
export const apiRequest = async (url, options = {}) => {
  const defaultOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': navigator.userAgent,
      'Referer': window.location.href,
      'sec-ch-ua': navigator.userAgent.includes('Chrome') ? '"Not)A;Brand";v="8", "Chromium";v="138", "Microsoft Edge";v="138"' : '',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"'
    },
    ...options
  };

  // Mesclar headers customizados com os padrões
  if (options.headers) {
    defaultOptions.headers = { ...defaultOptions.headers, ...options.headers };
  }

  return fetch(url, defaultOptions);
};

export default API_CONFIG; 