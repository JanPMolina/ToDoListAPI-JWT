# ToDoListAPI

Demo del curso **Diseño de Software**: una Web API en Node.js (Express 5) organizada por capas que usa **Supabase** como base de datos.

> El guion paso a paso para presentarla en clase está en [TUTORIAL.md](./TUTORIAL.md).

## Requisitos

- Node.js 20.6 o superior (usa `--env-file` y `--watch`, así que no hacen falta `dotenv` ni `nodemon`)
- Un proyecto en [Supabase](https://supabase.com)

## Puesta en marcha

1. En Supabase → **SQL Editor**, ejecutar `supabase/01_tasks.sql`.
2. Copiar `.env.example` a `.env` y completar `SUPABASE_URL` y `SUPABASE_SECRET_KEY` (Project Settings → API Keys). La secret key solo se usa en el servidor: la base de datos queda cerrada y la API es la única puerta de entrada.
3. Instalar y levantar:

```bash
npm install
npm run dev
```

4. Probar los endpoints con `requests.http` (extensión REST Client) en **http://localhost:4000/api**.

## Estructura

```
src/
├── server.js                 # Arranca el servidor HTTP (solo eso)
├── app.js                    # Construye la app: middlewares, rutas y manejo de errores
├── routes.js                 # Monta los módulos bajo /api
├── config/env.js             # Lee y valida variables de entorno (zod)
├── lib/supabase.js           # Cliente de Supabase
├── middlewares/              # validate, not-found, error-handler
├── utils/http-error.js       # Error con código HTTP
└── modules/
    ├── health/               # GET /api/health, GET /api/health/db
    └── task/
        ├── task.routes.js       # Rutas + composición de dependencias
        ├── task.controller.js   # HTTP  ->  servicio
        ├── task.service.js      # Reglas de negocio
        ├── task.repository.js   # Acceso a datos (único que conoce Supabase)
        ├── task.schema.js       # Schemas zod: validan la entrada
supabase/
├── 01_tasks.sql              # Tabla tasks + datos de ejemplo
```

## Endpoints

| Método | Ruta              | Descripción                         |
|--------|-------------------|-------------------------------------|
| GET    | `/api/health`     | La API está viva                    |
| GET    | `/api/health/db`  | La API llega a Supabase             |
| GET    | `/api/tasks`      | Listar tareas                       |
| GET    | `/api/tasks/:id`  | Obtener una tarea                   |
| POST   | `/api/tasks`      | Crear (`title`, `description?`, `done?`) |
| PATCH  | `/api/tasks/:id`  | Actualizar parcialmente             |
| DELETE | `/api/tasks/:id`  | Eliminar                            |

Errores siempre con la forma `{ "error": { "message": "...", "details": [...] } }`.
