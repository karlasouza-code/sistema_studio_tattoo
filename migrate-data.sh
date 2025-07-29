#!/bin/bash

# Script para migrar dados do Docker para a nuvem
# Uso: ./migrate-data.sh

echo "🚀 Iniciando migração de dados..."

# Verificar se o Docker está rodando
if ! docker ps > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Inicie o Docker primeiro."
    exit 1
fi

# Nome do container PostgreSQL (ajuste se necessário)
CONTAINER_NAME="tattoo_db_1"

# Verificar se o container existe
if ! docker ps -a --format "table {{.Names}}" | grep -q "$CONTAINER_NAME"; then
    echo "❌ Container $CONTAINER_NAME não encontrado."
    echo "Containers disponíveis:"
    docker ps -a --format "table {{.Names}}"
    exit 1
fi

# Verificar se o container está rodando
if ! docker ps --format "table {{.Names}}" | grep -q "$CONTAINER_NAME"; then
    echo "⚠️  Container $CONTAINER_NAME não está rodando. Iniciando..."
    docker start $CONTAINER_NAME
    sleep 5
fi

# Criar backup
echo "📦 Criando backup do banco de dados..."
BACKUP_FILE="tattoo_backup_$(date +%Y%m%d_%H%M%S).sql"

docker exec -t $CONTAINER_NAME pg_dumpall -c -U tattoo > $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo "✅ Backup criado com sucesso: $BACKUP_FILE"
    echo "📊 Tamanho do backup: $(du -h $BACKUP_FILE | cut -f1)"
else
    echo "❌ Erro ao criar backup"
    exit 1
fi

echo ""
echo "📋 Próximos passos:"
echo "1. Faça deploy do backend no Railway"
echo "2. Configure o banco PostgreSQL no Railway"
echo "3. Execute o script SQL no Railway:"
echo "   - Vá para o serviço PostgreSQL"
echo "   - Clique em 'Connect' → 'Query'"
echo "   - Cole o conteúdo do arquivo: $BACKUP_FILE"
echo ""
echo "4. Configure as variáveis de ambiente no Railway:"
echo "   DB_USER=postgres"
echo "   DB_HOST=seu-host-railway"
echo "   DB_NAME=railway"
echo "   DB_PASS=sua-senha-railway"
echo "   DB_PORT=5432"
echo "   SESSION_SECRET=sua-chave-secreta"
echo "   USUARIO=admin"
echo "   SENHA=1234"
echo ""
echo "5. Deploy do frontend no Vercel"
echo "6. Configure REACT_APP_API_URL no Vercel"
echo ""
echo "🎉 Migração concluída!" 