---
title: Enlace CRM Backend
author: Mildred M. Moreno L.
date: 04-05-2025
---
## Descripción General

Este backend está desarrollado en Node.js utilizando Express y MSSQL para la gestión de datos. Su objetivo es gestionar el flujo de registro de clientes, scoring, integración con BancoW, autenticación OTP vía Twilio y validaciones de usuarios.

---

## Estructura de Carpetas

- **controller/**: Lógica de negocio y acceso a datos.
- **db/**: Configuración de la base de datos.
- **middleware/**: Middlewares personalizados.
- **routes/**: Definición de rutas de la API.
- **test/**: Pruebas HTTP manuales.
- **index.js**: Punto de entrada de la aplicación.

---

## Configuración de Base de Datos

Archivo: `db/database.js`

- Utiliza variables de entorno (`.env`) para la configuración.
- Conexión pool a SQL Server usando el paquete `mssql`.

---

## Middlewares

### buscarUsuarioPorTelefono

- Ubicación: `middleware/phone_middleware.js`
- Busca un usuario o admin por número de teléfono en las tablas `UsuarioFinal` y `Admin`.
- Si encuentra, añade el usuario y tipo al request y llama a `next()`.
- Si no, responde 404.

---

## Rutas Principales

### 1. Flujo de Registro Enlace

Archivo: `routes/flujoRegistroEnlaceRoute.route.js`

| Método | Ruta                                         | Descripción                                                |
| ------ | -------------------------------------------- | ---------------------------------------------------------- |
| POST   | /api/flujoRegistroEnlace                     | Crea un nuevo registro de cliente.                         |
| GET    | /api/flujoRegistroEnlace                     | Obtiene todos los registros.                               |
| GET    | /api/flujoRegistroEnlace/:id                 | Obtiene un registro por ID.                                |
| GET    | /api/flujoRegistroEnlace/alpina/:alpinaId    | Obtiene un registro por ID de Alpina.                      |
| DELETE | /api/flujoRegistroEnlace/:id                 | Elimina un registro por ID.                                |
| GET    | /api/flujoRegistroEnlace/num/:Numero_Celular | Obtiene un registro por número de celular.                 |
| POST   | /api/twilio/send                             | Envía OTP (requiere middleware de validación de teléfono). |
| POST   | /api/twilio/verify                           | Verifica OTP.                                              |

#### Controlador: `controller/flujoRegistroEnlace.controller.js`

- **createRegistro**: Valida duplicados (cédula, celular, correo). Si existe, responde 400. Si no, inserta el registro.
- **getAll**: Lista todos los registros.
- **getById**: Busca por ID.
- **getByAlpina**: Busca por ID de Alpina.
- **getBynumber**: Busca por número de celular.
- **deleteById**: Elimina por ID.

### 2. BancoW

Archivo: `routes/bancoW.route.js`

| Método | Ruta                 | Descripción                                 |
| ------ | -------------------- | ------------------------------------------- |
| GET    | /api/bancow          | Lista todos los registros BancoW            |
| GET    | /api/bancow/:id      | Busca por IdFlujoRegistro                   |
| POST   | /api/bancow          | Crea un nuevo registro BancoW               |
| DELETE | /api/bancow/:id      | Elimina registro BancoW por IdFlujoRegistro |
| POST   | /api/bancow/user     | Crea usuario final en dashboard             |
| GET    | /api/bancow/user/:id | Obtiene usuario final por IdFlujoRegistro   |

#### Controlador: `controller/bancoW.controller.js`

- **getAllBancoW**: Lista todos los registros.
- **getByFlujoIdBancoW**: Busca por IdFlujoRegistro.
- **createBancoW**: Inserta registro, valida duplicados.
- **deleteBancoWbyId**: Elimina por IdFlujoRegistro.
- **createUserAccount**: Crea usuario final.
- **getUserAccountById**: Busca usuario final por IdFlujoRegistro.

### 3. Scoring

Archivo: `routes/scoring.route.js`

| Método | Ruta             | Descripción                          |
| ------ | ---------------- | ------------------------------------ |
| GET    | /api/scoring     | Lista todos los registros de scoring |
| GET    | /api/scoring/:id | Busca scoring por IdFlujoRegistro    |
| POST   | /api/scoring     | Crea un nuevo registro de scoring    |

#### Controlador: `controller/enlaceScoring.controller.js`

- **getAllScoring**: Lista todos los registros.
- **getScoringById**: Busca por IdFlujoRegistro.
- **createScoring**: Inserta registro, valida duplicados.

### 4. Truora

Archivo: `routes/truora.route.js`

| Método | Ruta        | Descripción                  |
| ------ | ----------- | ---------------------------- |
| GET    | /api/truora | Recibe información de Truora |

#### Controlador: `controller/truora.controller.js`

- **truoraInfo**: Recibe y muestra información de Truora.

---

## Seguridad y Variables de Entorno

- `.env` contiene credenciales de base de datos y Twilio.
- No subir este archivo a repositorios públicos.

---

## Ejemplo de Flujo de Registro

1. El usuario envía datos a `/api/flujoRegistroEnlace`.
2. El backend valida duplicados.
3. Si no hay duplicados, inserta el registro y responde éxito.
4. Se pueden consultar, eliminar o buscar registros por diferentes criterios.

---

## Dependencias Principales

- express
- mssql
- dotenv
- twilio

---

## Contacto y Soporte

Para dudas técnicas, contactar al equipo de desarrollo de Enlace CRM.

---

_Documento generado automáticamente por GitHub Copilot, 27 de mayo de 2025._
