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
SESSION_SECRET=tattoo-studio-karla-2024-secret-key-123456789
USUARIO=admin
SENHA=laurinhatattoo
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

## 🔧 Como corrigir:

### **1. Mude a Language:**
1. **Procure a seção "Language"** (deve estar no topo da página)
2. **Clique em "Edit"** na seção Language
3. **Mude de "Docker" para "Node"**
4. **Clique em "Save changes"**

### **2. Se não encontrar a seção Language:**
Pode ser que você precise **recriar o Web Service**:

1. **Delete este Web Service atual**
2. **Clique em "New +" → "Web Service"**
3. **Conecte o repositório novamente**
4. **Na configuração inicial, escolha "Node" como Language**

### **3. Configurações corretas para Node:**
```
Language: Node
Root Directory: backend
Build Command: npm install
Start Command: node index.js
Health Check Path: /health
```

##  **O problema atual:**
- Está configurado como **Docker**
- Mas não tem Dockerfile configurado corretamente
- Por isso está dando erro

##  **Solução mais rápida:**
1. **Delete este Web Service**
2. **Crie um novo** selecionando **Node** desde o início
3. **Configure o Root Directory como `backend`**

Quer que eu te ajude a recriar o Web Service corretamente? 

## ❌ Erro de conexão! Vamos resolver isso.

O erro `ECONNRESET` indica que a conexão foi resetada. Vamos tentar algumas soluções:

### **Solução 1: Verificar se o banco está ativo**
1. **Vá no Render**
2. **Verifique se o banco `tattoo-database` está "available"**
3. **Se estiver "suspended", clique em "Restart Database"**

### **Solução 2: Verificar configurações de acesso**
No Render, no banco PostgreSQL:
1. **Vá em "Access Control"**
2. **Verifique se tem `0.0.0.0/0`** (permite acesso de qualquer lugar)
3. **Se não tiver, adicione**

### **Solução 3: Usar URL externa**
Tente conectar usando a **External Database URL**:
```
postgresql://tattoo_user:SSf2yeuxDPQgEevlp3iIkpfmfN2khjNq@dpg-d24io195pdvs73fmh430-a.oregon-postgres.render.com:5432/tattoo_studio
```

### **Solução 4: Verificar se o banco está funcionando**
1. **Vá no Render**
2. **Clique no banco PostgreSQL**
3. **Verifique o status**
4. **Veja se há algum erro nos logs**

## 🔍 Me diga:
1. **O status do banco está "available"?**
2. **Aparece algum erro nos logs do banco?**
3. **Você consegue ver a External Database URL no Render?**

**Me manda o status do banco PostgreSQL no Render!** 🗄️ 