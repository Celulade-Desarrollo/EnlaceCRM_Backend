# TypeScript API Base

Un boilerplate o plantilla base para construir APIs RESTful utilizando Node.js, Express, TypeScript y Mongoose. Este proyecto proporciona una estructura sólida y un ejemplo de CRUD para empezar a desarrollar rápidamente.

## ✨ Características (Features)

-   **TypeScript**: Código tipado, robusto y más fácil de mantener.
-   **Express.js**: Framework minimalista para construir el servidor web y las APIs.
-   **SQL Server**: Elegante modelado deBase de Datos relacional para Node.js.
-   **Variables de Entorno**: Configuración centralizada usando archivos `.env`.
-   **Ejemplo de CRUD**: Implementación completa de operaciones Crear, Leer, Actualizar y Borrar para un modelo de `Usuario`.
-   **Estructura Escalable**: El código está organizado en carpetas (rutas, controladores, modelos) para facilitar el crecimiento del proyecto.

## 📋 Requisitos Previos

Asegúrate de tener instalado lo siguiente antes de comenzar:

-   Node.js (v16 o superior recomendado)
-   npm o yarn
-   Una instancia de MongoDB corriendo (localmente o en un servicio en la nube).

## 🚀 Instalación y Configuración

Sigue estos pasos para poner en funcionamiento el proyecto en tu entorno local:

1.  **Clona el repositorio:**
    (Recuerda reemplazar `TU_USUARIO/TU_REPOSITORIO` con los datos de tu repositorio de GitHub)
    ```bash
    git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
    cd TU_REPOSITORIO
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```
    O si usas yarn:
    ```bash
    yarn install
    ```

3.  **Configura las variables de entorno:**
    Crea una copia del archivo `.env.example` y renómbrala a `.env`.
    ```bash
    cp .env.example .env
    ```
    Abre el archivo `.env` y modifica las variables según tu configuración.
    ```env
    # URI de conexión a tu base de datos MSSQL

    Edita el archivo `.env` para incluir los detalles de conexión a tu SQL Server:
    ```    
    # Detalles de conexión a SQL Server
    DB_SERVER=your_server_address
    DB_NAME=your_database_name
    DB_USER=your_username
    DB_PASSWORD=your_password

    ```
    # Puerto en el que correrá el servidor
    PORT=3000
    ```

## 📜 Scripts Disponibles

Puedes usar los siguientes scripts definidos en `package.json`:

-   **`npm run dev`**: Inicia el servidor en modo de desarrollo usando `ts-node-dev`. El servidor se reiniciará automáticamente cada vez que hagas cambios en el código.

-   **`npm run build`**: Compila el código de TypeScript a JavaScript. Los archivos resultantes se guardarán en la carpeta `dist`.

-   **`npm run start`**: Ejecuta la aplicación en modo de producción desde la carpeta `dist`. Debes ejecutar `npm run build` antes de usar este comando.

## ⚙️ Endpoints de la API

El proyecto incluye un conjunto de endpoints para gestionar usuarios.

### Usuarios (`/users`)

-   **`GET /users`**
    -   Obtiene una lista de todos los usuarios.
    -   **Respuesta Exitosa (200):**
        ```json
        [
            {
                "_id": "60d...e9d",
                "name": "John Doe",
                "email": "john.doe@example.com",
                "password": "...",
                "createdAt": "...",
                "updatedAt": "..."
            }
        ]
        ```

-   **`POST /users`**
    -   Crea un nuevo usuario.
    -   **Body (raw/json):**
        ```json
        {
            "name": "Jane Doe",
            "email": "jane.doe@example.com",
            "password": "yoursecurepassword"
        }
        ```
    -   **Respuesta Exitosa (200):** Devuelve el objeto del usuario creado.

---

### Usuario por ID (`/users/:id`)

-   **`GET /users/:id`**
    -   Obtiene un usuario específico por su ID.
    -   **Respuesta Exitosa (200):** Devuelve el objeto del usuario.

-   **`PUT /users/:id`**
    -   Actualiza un usuario existente por su ID.
    -   **Body (raw/json):** Puedes enviar cualquier campo que desees actualizar.
        ```json
        {
            "name": "Jane Smith"
        }
        ```
    -   **Respuesta Exitosa (200):** Devuelve el objeto del usuario actualizado.

-   **`DELETE /users/:id`**
    -   Elimina un usuario por su ID.
    -   **Respuesta Exitosa (200):** Devuelve un mensaje de confirmación.
        ```json
        {
            "message": "User Deleted"
        }
        ```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Siéntete libre de usarlo y modificarlo.