# 🚀 Deploy no GitHub Pages - Tattoo Studio

Guia completo para fazer deploy da sua aplicação usando **GitHub Pages + Render**.

## 📋 Pré-requisitos

- Conta no GitHub
- Projeto já commitado no GitHub
- Node.js instalado no computador

---

## 🎯 PASSO 1: Deploy do Backend no Render

### 1.1 Criar conta no Render
1. Acesse [render.com](https://render.com)
2. Clique em **"Get Started"**
3. Faça login com sua conta do GitHub
4. Autorize o Render a acessar seus repositórios

### 1.2 Criar Web Service (Backend)
1. Clique em **"New +"** → **"Web Service"**
2. Conecte seu repositório GitHub
3. Selecione o repositório **TATTOO**
4. Configure:
   - **Name**: `tattoo-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Root Directory**: `backend`
5. Clique em **"Create Web Service"**

### 1.3 Criar Database (PostgreSQL)
1. Clique em **"New +"** → **"PostgreSQL"**
2. Configure:
   - **Name**: `tattoo-database`
   - **Database**: `tattoo_studio`
   - **User**: `tattoo_user`
3. Clique em **"Create Database"**
4. **IMPORTANTE**: Anote as credenciais que aparecem

### 1.4 Configurar variáveis de ambiente
1. Vá no seu **Web Service** (backend)
2. Clique em **"Environment"**
3. Adicione as variáveis:

```
DB_USER=tattoo_user
DB_HOST=seu-host-render
DB_NAME=tattoo_studio
DB_PASS=sua-senha-render
DB_PORT=5432
SESSION_SECRET=minha-chave-secreta-123456789
USUARIO=admin
SENHA=1234
```

### 1.5 Configurar o banco de dados
1. Vá no seu **PostgreSQL**
2. Clique em **"Connect"** → **"External Database URL"**
3. Copie a URL
4. Use um cliente PostgreSQL (como pgAdmin) ou execute via terminal:
   ```sql
   -- Cole o conteúdo do arquivo backend/init.sql aqui
   ```

### 1.6 Verificar se está funcionando
1. Vá no **Web Service**
2. Clique na URL que aparece
3. Adicione `/health` no final da URL
4. Deve aparecer: `{"status":"OK","timestamp":"..."}`

---

## 🎯 PASSO 2: Deploy do Frontend no GitHub Pages

### 2.1 Instalar gh-pages
No terminal, na pasta do projeto:
```bash
cd frontend
npm install gh-pages --save-dev
```

### 2.2 Configurar o package.json
1. Abra `frontend/package.json`
2. Altere a linha `"homepage"` para sua URL:
   ```json
   "homepage": "https://SEU_USUARIO.github.io/TATTOO"
   ```
3. Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub

### 2.3 Configurar a URL da API
1. Crie um arquivo `.env` na pasta `frontend`:
   ```
   REACT_APP_API_URL=https://seu-backend.onrender.com
   ```
2. Substitua pela URL do seu backend no Render

### 2.4 Fazer deploy
No terminal:
```bash
cd frontend
npm run deploy
```

### 2.5 Configurar GitHub Pages
1. Vá no seu repositório no GitHub
2. Clique em **"Settings"**
3. Role até **"Pages"**
4. Em **"Source"**, selecione **"Deploy from a branch"**
5. Selecione a branch **"gh-pages"**
6. Clique em **"Save"**

---

## 🎯 PASSO 3: Testar a Aplicação

### 3.1 Testar o backend
- URL: `https://seu-backend.onrender.com/health`
- Deve retornar status OK

### 3.2 Testar o frontend
- URL: `https://seu-usuario.github.io/TATTOO`
- Deve aparecer a tela de login
- Teste com: usuário `admin`, senha `1234`

---

## 🚨 Solução de Problemas

### Problema 1: Erro de CORS
**Sintoma**: Erro no console sobre CORS
**Solução**: 
1. Vá no Render, Web Service
2. Adicione variável: `CORS_ORIGIN=https://seu-usuario.github.io`
3. Faça redeploy

### Problema 2: Frontend não carrega
**Sintoma**: Página em branco
**Solução**:
1. Verifique se a variável `REACT_APP_API_URL` está correta
2. Faça novo deploy: `npm run deploy`
3. Aguarde alguns minutos

### Problema 3: Erro 404 no GitHub Pages
**Sintoma**: Página não encontrada
**Solução**:
1. Verifique se a branch `gh-pages` foi criada
2. Verifique se o GitHub Pages está configurado corretamente
3. Aguarde alguns minutos para propagar

---

## 📊 URLs Finais

- **Frontend**: `https://seu-usuario.github.io/TATTOO`
- **Backend**: `https://seu-backend.onrender.com`

---

## 💰 Custos

- **GitHub Pages**: Totalmente gratuito
- **Render**: 
  - Web Service: Gratuito (dorme após 15 min de inatividade)
  - PostgreSQL: Gratuito por 90 dias, depois $7/mês

---

## 🔄 Atualizações

### Para atualizar o frontend:
```bash
cd frontend
npm run deploy
```

### Para atualizar o backend:
- Faça commit no GitHub
- O Render faz deploy automático

---

## 🎉 Próximos Passos

1. **Configurar domínio personalizado** (opcional)
2. **Configurar SSL/HTTPS** (já vem configurado)
3. **Configurar monitoramento**
4. **Configurar backups**

---

**Dúvidas?** Se encontrar algum problema, me avise qual passo específico e qual erro apareceu! 