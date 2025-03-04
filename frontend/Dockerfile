# Usamos la imagen de Node
FROM node:18

# Definimos el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiamos archivos de configuración
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos todo el código fuente
COPY . .

# Compilamos el proyecto
RUN npm run build

# Exponemos el puerto en el contenedor
EXPOSE 3000

# Comando para ejecutar la app en modo producción
CMD ["npm", "start"]
