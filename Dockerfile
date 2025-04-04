# Usa una imagen liviana con Node
FROM node:18-alpine

# Setea el directorio de trabajo
WORKDIR /app

# Copia solo package.json + lock para instalar dependencias primero (mejor cache)
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el resto del proyecto
COPY . .

# Build de producción
RUN npm run build

# Exponé el puerto 8080 como indica el enunciado
EXPOSE 8080

# Comando para arrancar el servidor Next.js en modo producción en el puerto 8080
CMD ["npx", "next", "start", "-p", "8080"]
  