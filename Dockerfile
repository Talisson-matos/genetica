# Usar uma imagem oficial do Node.js como base
FROM node:18-alpine 

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos do projeto para o container
COPY package.json package-lock.json ./
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Construir a aplicação Next.js
RUN npm run build

# Expor a porta padrão do Next.js
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]
