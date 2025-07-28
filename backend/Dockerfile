FROM node:18-alpine

WORKDIR /app

# Copia package.json e package-lock.json (se existir)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta que seu app usa
EXPOSE 3001

# Comando para iniciar o app
CMD ["node", "index.js"]
