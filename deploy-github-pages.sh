#!/bin/bash

# Script de deploy automatizado para GitHub Pages + Render
# Uso: ./deploy-github-pages.sh

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

echo "🚀 Deploy Tattoo Studio - GitHub Pages + Render"
echo "================================================"

# Verificar se estamos no diretório correto
if [ ! -f "frontend/package.json" ] || [ ! -f "backend/package.json" ]; then
    error "Execute este script na raiz do projeto (onde estão as pastas frontend e backend)"
fi

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    error "Node.js não está instalado. Instale em: https://nodejs.org/"
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    error "npm não está instalado. Instale o Node.js primeiro."
fi

# Verificar se o git está instalado
if ! command -v git &> /dev/null; then
    error "Git não está instalado. Instale em: https://git-scm.com/"
fi

log "✅ Verificações iniciais concluídas"

# Perguntar o nome de usuário do GitHub
echo ""
read -p "Digite seu nome de usuário do GitHub: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    error "Nome de usuário do GitHub é obrigatório"
fi

# Perguntar a URL do backend no Render
echo ""
read -p "Digite a URL do seu backend no Render (ex: https://tattoo-backend.onrender.com): " BACKEND_URL

if [ -z "$BACKEND_URL" ]; then
    error "URL do backend é obrigatória"
fi

log "🔧 Configurando o projeto..."

# Atualizar homepage no package.json
sed -i "s|https://seu-usuario.github.io/TATTOO|https://$GITHUB_USERNAME.github.io/TATTOO|g" frontend/package.json

log "✅ Homepage configurada: https://$GITHUB_USERNAME.github.io/TATTOO"

# Criar arquivo .env para o frontend
echo "REACT_APP_API_URL=$BACKEND_URL" > frontend/.env

log "✅ Variável de ambiente configurada: REACT_APP_API_URL=$BACKEND_URL"

# Instalar gh-pages se não estiver instalado
if [ ! -d "frontend/node_modules/gh-pages" ]; then
    log "📦 Instalando gh-pages..."
    cd frontend
    npm install gh-pages --save-dev
    cd ..
fi

# Fazer build e deploy
log "🏗️  Fazendo build do projeto..."
cd frontend
npm run build

if [ $? -ne 0 ]; then
    error "Erro no build do projeto"
fi

log "🚀 Fazendo deploy no GitHub Pages..."
npm run deploy

if [ $? -ne 0 ]; then
    error "Erro no deploy"
fi

cd ..

log "✅ Deploy concluído com sucesso!"
echo ""
echo "📋 Próximos passos:"
echo "1. Vá no seu repositório no GitHub: https://github.com/$GITHUB_USERNAME/TATTOO"
echo "2. Clique em 'Settings'"
echo "3. Role até 'Pages'"
echo "4. Em 'Source', selecione 'Deploy from a branch'"
echo "5. Selecione a branch 'gh-pages'"
echo "6. Clique em 'Save'"
echo ""
echo "🌐 Sua aplicação estará disponível em:"
echo "   Frontend: https://$GITHUB_USERNAME.github.io/TATTOO"
echo "   Backend: $BACKEND_URL"
echo ""
echo "⏳ Aguarde alguns minutos para o GitHub Pages ficar disponível"
echo ""
log "🎉 Deploy finalizado!" 