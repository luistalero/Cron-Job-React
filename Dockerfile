# Usa una imagen base de Node.js para construir la aplicación
FROM node:20-alpine AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de definición de paquetes (package.json y package-lock.json/yarn.lock)
# antes de copiar el resto del código. Esto optimiza el uso de la caché de Docker.
COPY src/package*.json ./

# Copia el resto del código de la aplicación
COPY . .

RUN npm install && npm cache clean --force

# --- Segunda etapa: Sirve la aplicación con Nginx ---
FROM nginx:alpine

# Copia la configuración personalizada de Nginx (opcional, pero buena práctica)
# Si no tienes un archivo nginx.conf personalizado, puedes omitir esta línea
# y la línea que crea el archivo nginx.conf más abajo.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos estáticos de la aplicación construida al directorio de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expone el puerto 80 del contenedor
EXPOSE 80

# Comando para iniciar Nginx cuando el contenedor se ejecute
CMD ["nginx", "-g", "daemon off;"]