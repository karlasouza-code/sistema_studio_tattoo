# 🚀 Guia de Deploy na Nuvem - Tattoo Studio

Este guia te ajudará a migrar sua aplicação do Docker para a nuvem usando **Vercel + Railway**.

## 📋 Pré-requisitos

- Conta no [Vercel](https://vercel.com) (gratuita)
- Conta no [Railway](https://railway.app) (gratuita para começar)
- Git configurado no seu projeto

## 🎯 Opção 1: Vercel + Railway (Recomendado)

### Passo 1: Deploy do Backend no Railway

1. **Acesse Railway.app** e faça login
2. **Crie um novo projeto**
3. **Adicione um banco PostgreSQL**:
   - Clique em "New Service" → "Database" → "PostgreSQL"
   - Anote as credenciais do banco

4. **Deploy do Backend**:
   - Clique em "New Service" → "GitHub Repo"
   - Selecione seu repositório
   - Configure as variáveis de ambiente:

```env
DB_USER=postgres
DB_HOST=seu-host-railway
DB_NAME=railway
DB_PASS=sua-senha-railway
DB_PORT=5432
SESSION_SECRET=sua-chave-secreta-aqui
USUARIO=admin
SENHA=1234
```

5. **Configure o banco**:
   - No Railway, vá para o serviço do PostgreSQL
   - Clique em "Connect" → "Query"
   - Execute o script SQL do arquivo `backend/init.sql`

### Passo 2: Deploy do Frontend no Vercel

1. **Acesse Vercel.com** e faça login
2. **Importe seu projeto** do GitHub
3. **Configure o projeto**:
   - Framework Preset: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

4. **Configure as variáveis de ambiente**:
```env
REACT_APP_API_URL=https://seu-backend.railway.app
REACT_APP_ENV=production
```

5. **Deploy!** O Vercel fará o build e deploy automaticamente

## 🎯 Opção 2: AWS (Mais robusto)

### Estrutura AWS:
- **Frontend**: S3 + CloudFront
- **Backend**: EC2 ou Lambda
- **Banco**: RDS PostgreSQL
- **Load Balancer**: ALB

### Passos AWS:
1. **Criar VPC e subnets**
2. **Deploy RDS PostgreSQL**
3. **Criar EC2 para backend**
4. **Configurar S3 para frontend**
5. **Configurar CloudFront**
6. **Configurar Route 53**

## 🎯 Opção 3: Google Cloud Platform

### Estrutura GCP:
- **Frontend**: Firebase Hosting
- **Backend**: Cloud Run
- **Banco**: Cloud SQL

## 🔧 Configurações Importantes

### CORS no Backend
Certifique-se de que o CORS está configurado corretamente:

```javascript
app.use(cors({
  origin: ['https://seu-frontend.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

### Variáveis de Ambiente
Crie um arquivo `.env` no backend com:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=tattoo_studio
DB_PASS=tattoo123
DB_PORT=5432
SESSION_SECRET=sua-chave-secreta
USUARIO=admin
SENHA=1234
```

## 🚨 Problemas Comuns

### 1. Erro de CORS
- Verifique se o domínio do frontend está na lista de origins permitidos
- Certifique-se de que `credentials: true` está configurado

### 2. Erro de Conexão com Banco
- Verifique se as variáveis de ambiente estão corretas
- Confirme se o banco está acessível externamente

### 3. Sessões não funcionam
- Configure um Redis ou use sessões em memória
- Verifique se o `SESSION_SECRET` está definido

## 📊 Monitoramento

### Railway
- Logs automáticos
- Métricas de uso
- Health checks

### Vercel
- Analytics
- Performance monitoring
- Error tracking

## 💰 Custos Estimados

### Vercel + Railway (Início)
- **Vercel**: Gratuito (até 100GB/mês)
- **Railway**: $5/mês (500 horas)
- **Total**: ~$5/mês

### AWS (Produção)
- **EC2**: $10-50/mês
- **RDS**: $15-30/mês
- **S3 + CloudFront**: $1-5/mês
- **Total**: $25-85/mês

## 🔄 Migração de Dados

Se você já tem dados no Docker:

1. **Exporte do Docker**:
```bash
docker exec -t seu_container_postgres pg_dumpall -c -U tattoo > dump.sql
```

2. **Importe no Railway**:
- Vá para o PostgreSQL no Railway
- Clique em "Connect" → "Query"
- Cole o conteúdo do dump.sql

## 📞 Suporte

- **Railway**: [Discord](https://discord.gg/railway)
- **Vercel**: [Documentação](https://vercel.com/docs)
- **AWS**: [Suporte](https://aws.amazon.com/support/)

---

**Próximos passos**: Escolha uma opção e siga os passos detalhados. Recomendo começar com Vercel + Railway para simplicidade! 