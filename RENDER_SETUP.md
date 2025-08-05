# Configuração do Render

## 🎯 Configuração do Backend no Render

### 1. Variáveis de Ambiente
Configure estas variáveis no seu backend no Render:

```
DB_HOST=dpg-d24io195pdvs73fmh430-a
DB_PORT=5432
DB_NAME=tattoo_studio
DB_USER=tattoo_user
DB_PASS=sua_senha_aqui
NODE_ENV=production
SESSION_SECRET=sua_chave_secreta_aqui
```

### 2. URL do Backend
Substitua `seu-backend.onrender.com` pela URL real do seu backend no Render.

## 🎯 Configuração do Frontend

### 1. Variável de Ambiente
Configure no frontend (se estiver no Render também):
```
REACT_APP_API_URL=https://seu-backend.onrender.com
```

### 2. Ou atualize diretamente no código:
```javascript
const API_BASE_URL = 'https://seu-backend.onrender.com';
```

## 🧪 Testes

### 1. Teste básico:
```
https://seu-backend.onrender.com/test
```

### 2. Teste de headers:
```
https://seu-backend.onrender.com/test-headers
```

### 3. Health check:
```
https://seu-backend.onrender.com/health
```

## ✅ Status Atual

- ✅ **Backend:** Configurado para Render
- ✅ **Banco:** PostgreSQL no Render
- ✅ **Headers:** Configurados corretamente
- ✅ **Frontend:** Atualizado para usar Render
- ⚠️ **Deploy:** Precisa fazer deploy com as novas configurações

## 🚀 Próximos Passos

1. **Configure as variáveis de ambiente** no Render
2. **Faça deploy** do backend
3. **Teste** as rotas no Render
4. **Deploy** do frontend (se estiver no Render)

## 📝 Notas

- O banco PostgreSQL está configurado no Render
- Headers HTTP estão funcionando perfeitamente
- Todas as URLs foram atualizadas para usar o Render
- Função `apiRequest` centraliza todas as requisições 