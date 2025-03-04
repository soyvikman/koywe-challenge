# Usamos la imagen de Node
FROM node:18

# Definimos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de configuración
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos todo el código fuente
COPY . .

# Exponemos el puerto en el contenedor
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:dev"]
