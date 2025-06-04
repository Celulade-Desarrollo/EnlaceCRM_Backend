# Imagen base oficial de Node.js
FROM node:18

# Crear directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto que usa tu app (ajusta si es otro)
EXPOSE 3000

# Crear un usuario no root y usarlo
RUN useradd --user-group --create-home --shell /bin/false appuser
USER appuser

# Comando para correr la app
CMD ["node", "index.js"]
