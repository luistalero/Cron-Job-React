# --- Etapa 1: Build de la aplicación React ---
    FROM node:20-alpine AS build_stage

    # Establece el directorio de trabajo DENTRO de la carpeta 'src'
    WORKDIR /app/src
    
    # Copia todo el contenido de tu carpeta 'src' local al WORKDIR del contenedor
    # Esto incluye package.json, index.html, tu código React, etc.
    COPY src/ .
    
    # Instala las dependencias
    RUN npm install
    
    # Construye la aplicación para producción
    # Esto generará la carpeta 'build' dentro de /app/src
    RUN npm run build
    
    # --- Etapa 2: Servir con NGINX ---
    FROM nginx:alpine
    
    # Copia el archivo de configuración de NGINX que creaste
    # NGINX usará este archivo para saber cómo servir los archivos
    COPY ngnix/nginx.conf /etc/nginx/nginx.conf
    
    # Elimina los archivos por defecto de NGINX para evitar conflictos
    RUN rm -rf /usr/share/nginx/html/*
    
    # Copia los archivos compilados de la etapa de build a la ubicación que NGINX espera
    # Los archivos están en /app/src/build en la etapa anterior (build_stage)
    COPY --from=build_stage /app/src/build /usr/share/nginx/html
    
    # Expone el puerto por defecto de NGINX (80)
    EXPOSE 80
    
    # Comando por defecto de NGINX para iniciar el servidor
    CMD ["nginx", "-g", "daemon off;"]