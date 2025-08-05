# Configuração de Headers HTTP

## Melhorias Implementadas

### Backend (backend/index.js)

#### 1. Configuração CORS Expandida
- Adicionados headers permitidos: `Referer`, `User-Agent`, `sec-ch-ua`, `sec-ch-ua-mobile`, `sec-ch-ua-platform`
- Mantidos headers essenciais: `Content-Type`, `Authorization`

#### 2. Middleware de Headers de Segurança
```javascript
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Type, Authorization');
  next();
});
```

#### 3. Middleware para Content-Type JSON
```javascript
app.use((req, res, next) => {
  const originalJson = res.json;
  res.json = function(data) {
    res.setHeader('Content-Type', 'application/json');
    return originalJson.call(this, data);
  };
  next();
});
```

### Frontend (frontend/src/config.js)

#### 1. Função Utilitária apiRequest
```javascript
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
  return fetch(url, defaultOptions);
};
```

## Headers Configurados

### Headers de Requisição (Frontend → Backend)
- `Content-Type: application/json` - Tipo de conteúdo
- `Accept: application/json` - Aceita respostas JSON
- `User-Agent` - Informações do navegador
- `Referer` - URL de origem
- `sec-ch-ua` - Informações do Chromium
- `sec-ch-ua-mobile` - Indicador mobile
- `sec-ch-ua-platform` - Plataforma do sistema

### Headers de Resposta (Backend → Frontend)
- `Content-Type: application/json` - Garantido para todas as respostas JSON
- `X-Content-Type-Options: nosniff` - Previne MIME sniffing
- `X-Frame-Options: DENY` - Previne clickjacking
- `X-XSS-Protection: 1; mode=block` - Proteção XSS
- `Access-Control-Expose-Headers` - Headers expostos para CORS

## Rota de Teste

Adicionada rota `/test-headers` no backend para verificar se os headers estão sendo recebidos corretamente:

```javascript
app.get('/test-headers', (req, res) => {
  res.json({
    message: 'Headers testados com sucesso',
    headers: {
      'content-type': req.get('content-type'),
      'referer': req.get('referer'),
      'user-agent': req.get('user-agent'),
      'sec-ch-ua': req.get('sec-ch-ua'),
      'sec-ch-ua-mobile': req.get('sec-ch-ua-mobile'),
      'sec-ch-ua-platform': req.get('sec-ch-ua-platform')
    },
    timestamp: new Date().toISOString()
  });
});
```

## Como Usar

### No Frontend
Substitua chamadas `fetch` por `apiRequest`:

```javascript
// Antes
const res = await fetch('/api/endpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify(data)
});

// Depois
const res = await apiRequest('/api/endpoint', {
  method: 'POST',
  body: JSON.stringify(data)
});
```

### Testando
Acesse `http://localhost:3001/test-headers` para verificar se os headers estão sendo enviados corretamente.

## Benefícios

1. **Segurança**: Headers de segurança adicionados
2. **Consistência**: Content-Type sempre `application/json` para respostas JSON
3. **Compatibilidade**: Headers do navegador moderno incluídos
4. **Manutenibilidade**: Função centralizada para requisições
5. **Debugging**: Rota de teste para verificar headers 