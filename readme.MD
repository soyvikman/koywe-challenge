# Koywe Challenge - Technical Test

Este proyecto consiste en un sistema de cotizaciones entre distintas monedas, desarrollado en NestJS y Next.js, con autenticación JWT y persistencia en MongoDB.

## Arquitectura

- **Backend:** NestJS con Mongoose, Swagger para documentación y autenticación JWT.
- **Frontend:** Next.js con páginas protegidas, consumo de API, manejo de sesiones y redirecciones.
- **Base de Datos:** MongoDB.
- **Contenedores:** Docker Compose para orquestar Backend, Frontend y MongoDB.

## Endpoints principales

| Método | Endpoint       | Protección | Descripción                    |
| ------ | -------------- | ---------- | ------------------------------ |
| POST   | /auth/login    | No         | Iniciar sesión                 |
| POST   | /auth/register | No         | Registrar usuario              |
| POST   | /quote         | Sí         | Crear cotización               |
| GET    | /quote/\:id    | Sí         | Obtener cotización por ID      |
| GET    | /quote         | Sí         | Obtener todas las cotizaciones |

La documentación completa de los endpoints se encuentra disponible en [Swagger](http://localhost:3000/api/docs) al levantar el backend.

## Instalación y Ejecución Local

### Pre-requisitos

- Node.js 18+
- MongoDB (corriendo localmente en puerto 27017)

### Pasos

1. Clonar el repositorio.
2. Configurar variables de entorno:
   - En `/backend/.env` configurar:
     ```
     MONGO_URI=mongodb://localhost:27017/koywe
     JWT_SECRET=my-secret-key
     ```
   - En `/frontend/.env` configurar:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:3000
     ```
   - Ambos archivos `.env` tienen un archivo de ejemplo `.env.example` que pueden copiar y renombrar.
3. Instalar dependencias:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
4. Levantar los servicios:
   - **MongoDB**: Asegurarse que está corriendo en `localhost:27017`
   - **Backend**:
     ```bash
     cd backend
     npm run start:dev
     ```
   - **Frontend**:
     ```bash
     cd frontend
     npm run dev
     ```
5. Acceder al frontend en: [http://localhost:3001](http://localhost:3001)

---

## Ejecución con Docker (recomendado)

Si prefieres ejecutar todo con Docker (Mongo incluido), puedes usar:

```bash
docker-compose up --build
```

En este caso:

- El backend estará disponible en: [http://localhost:3000](http://localhost:3000)
- El frontend estará disponible en: [http://localhost:3001](http://localhost:3001)
- MongoDB estará aislado en el contenedor `mongo`

⚠️ Importante: Cuando ejecutas en Docker, **el archivo **`/backend/.env`** debe tener**:

```
MONGO_URI=mongodb://mongo:27017/koywe
```

Si ejecutas sin Docker (Mongo local), debe ser:

```
MONGO_URI=mongodb://localhost:27017/koywe
```

---

## Variables de entorno

| Variable            | Ubicación     | Descripción                           |
| ------------------- | ------------- | ------------------------------------- |
| MONGO_URI           | backend/.env  | URI de conexión a MongoDB             |
| JWT_SECRET          | backend/.env  | Clave secreta para firmar JWT         |
| NEXT_PUBLIC_API_URL | frontend/.env | URL base del backend para el frontend |

Ambos entornos (backend y frontend) incluyen archivos ``que sirven como referencia para configurar los archivos`.env` reales.

---

## Uso de herramientas de IA

Durante el desarrollo se utilizaron herramientas de IA para acelerar y validar algunas implementaciones:

- **ChatGPT 4**
  - Apoyo principal en:
    - Creación y mejora de tests (unitarios) para NestJS
    - Validación de conceptos relacionados a **Facade Pattern** y buenas prácticas de arquitectura
    - Implementación de la autenticación JWT y configuración de guards
    - Generación de documentación Swagger con decorators de NestJS

---

## Observaciones adicionales

- El sistema tiene autenticación basada en JWT.
- Los endpoints protegidos requieren que el token se envíe en el header `Authorization` como `Bearer <token>`.
- El frontend detecta automáticamente si hay un token almacenado en `localStorage` para mostrar o esconder opciones en el menú.
- Los tokens tienen una expiración configurable, pero en esta prueba el enfoque fue simplemente validarlos sin fecha de expiración para simplificar el desarrollo.
- El frontend no tiene SSR activo, se ejecuta completamente como SPA.
- Se siguieron prácticas de separación de capas en el backend, usando el patrón **Facade** para encapsular la lógica de negocio.

## Comentarios

Gracias por la experiencia y éxitos con el proyecto que vienen desarrollando.
