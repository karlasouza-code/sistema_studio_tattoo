#!/bin/bash

# Script de deploy automatizado para Tattoo Studio
# Uso: ./deploy.sh [vercel|aws|railway]

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

# Verificar se o comando foi fornecido
if [ $# -eq 0 ]; then
    echo "Uso: $0 [vercel|aws|railway]"
    echo ""
    echo "Opções:"
    echo "  vercel   - Deploy do frontend no Vercel"
    echo "  railway  - Deploy do backend no Railway"
    echo "  aws      - Deploy completo na AWS"
    exit 1
fi

COMMAND=$1

case $COMMAND in
    "vercel")
        log "🚀 Iniciando deploy do frontend no Vercel..."
        
        # Verificar se o Vercel CLI está instalado
        if ! command -v vercel &> /dev/null; then
            log "Instalando Vercel CLI..."
            npm install -g vercel
        fi
        
        # Navegar para o diretório do frontend
        cd frontend
        
        # Build do projeto
        log "📦 Fazendo build do projeto..."
        npm run build
        
        # Deploy no Vercel
        log "🌐 Fazendo deploy no Vercel..."
        vercel --prod
        
        log "✅ Frontend deployado com sucesso!"
        ;;
        
    "railway")
        log "🚀 Iniciando deploy do backend no Railway..."
        
        # Verificar se o Railway CLI está instalado
        if ! command -v railway &> /dev/null; then
            log "Instalando Railway CLI..."
            npm install -g @railway/cli
        fi
        
        # Navegar para o diretório do backend
        cd backend
        
        # Login no Railway
        log "🔐 Fazendo login no Railway..."
        railway login
        
        # Deploy
        log "🚂 Fazendo deploy no Railway..."
        railway up
        
        log "✅ Backend deployado com sucesso!"
        ;;
        
    "aws")
        log "🚀 Iniciando deploy completo na AWS..."
        
        # Verificar se o AWS CLI está instalado
        if ! command -v aws &> /dev/null; then
            error "AWS CLI não está instalado. Instale em: https://aws.amazon.com/cli/"
        fi
        
        # Verificar se está logado no AWS
        if ! aws sts get-caller-identity &> /dev/null; then
            error "Você não está logado no AWS. Execute: aws configure"
        fi
        
        # Verificar se o CloudFormation está disponível
        if ! aws cloudformation describe-stacks --stack-name test &> /dev/null; then
            warn "Verificando permissões do CloudFormation..."
        fi
        
        # Deploy da infraestrutura
        log "🏗️  Criando infraestrutura na AWS..."
        aws cloudformation create-stack \
            --stack-name tattoo-studio \
            --template-body file://aws-deploy.yml \
            --parameters ParameterKey=Environment,ParameterValue=production \
            --capabilities CAPABILITY_IAM
        
        log "⏳ Aguardando criação da infraestrutura..."
        aws cloudformation wait stack-create-complete --stack-name tattoo-studio
        
        # Obter outputs
        log "📋 Obtendo informações da infraestrutura..."
        aws cloudformation describe-stacks \
            --stack-name tattoo-studio \
            --query 'Stacks[0].Outputs' \
            --output table
        
        log "✅ Infraestrutura AWS criada com sucesso!"
        log "📝 Próximos passos:"
        log "   1. Configure o backend para usar o RDS"
        log "   2. Deploy do backend no EC2 ou ECS"
        log "   3. Upload do frontend para o S3"
        ;;
        
    *)
        error "Comando inválido: $COMMAND"
        echo "Comandos disponíveis: vercel, railway, aws"
        exit 1
        ;;
esac

log "🎉 Deploy concluído com sucesso!" 