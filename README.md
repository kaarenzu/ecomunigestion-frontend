# 🏢 ecomunigestion-frontend ✅

**Sistema de Gestión de Reportes Ciudadanos** — Frontend SPA construido con React 19 y Vite.

---

## 🔗 Acceso al Sistema en Producción

### URL Desplegada
```
🌐 https://glistening-dasik-e0daa0.netlify.app/
```

---

## 🧑‍💼 Usuarios de Prueba

El sistema cuenta con dos perfiles de usuario para evaluar diferentes funcionalidades:

### 1. Perfil Funcionario (Administrador)
```
Email:       usr_funcionario@gmail.com
Contraseña:  Iplacex_2026
Rol:         Funcionario
Acceso:      Panel administrativo, gestión de reportes, cambio de estado
```

### 2. Perfil Ciudadano (Usuario Regular)
```
Email:       usr_ciudadano@gmail.com
Contraseña:  Iplacex_2026
Rol:         Ciudadano
Acceso:      Crear reportes, consultar estado, ver zonas críticas
```

---

## 🚧 Estado del Proyecto

El frontend se encuentra en **fase de desarrollo activo**.

### Hitos Completados
✅ Estructura base de la aplicación
✅ Sistema de ruteo con control de roles
✅ Autenticación con Firebase
✅ Páginas principales (Login, Register, Dashboard, Reportes, etc.)
✅ Integración con contexto de autenticación
✅ Despliegue en Netlify

### Próximas Etapas
- 🔄 Optimización de performance y UX
- 📊 Integración completa con API backend local
- 🧪 Cobertura de tests
- 📱 Responsividad mobile mejorada




## 🏗️ Arquitectura Técnica

### Stack Tecnológico

| Capa | Tecnología | Descripción |
|------|-----------|-------------|
| **Frontend** | React 19 + Vite | SPA moderna con build rápido |
| **Ruteo** | react-router-dom v7 | Enrutamiento y navegación |
| **Autenticación** | Firebase Auth | Gestión segura de sesiones |
| **Estado Global** | Context API | Contexto de autenticación (`AuthContext`) |
| **API Client** | Fetch API | Llamadas HTTP al backend local |
| **Linting** | ESLint | Validación de código |
| **Build** | Vite | Bundler ultrarrápido |

### Infraestructura

```
┌─────────────────────────────────────────────────────────────┐
│                  FRONTEND (Netlify)                         │
│  https://glistening-dasik-e0daa0.netlify.app/              │
│                                                              │
│  ├─ React 19 SPA                                            │
│  ├─ Firebase Authentication                                 │
│  └─ Contexto Auth (AuthContext.jsx)                         │
└────────────────────────┬────────────────────────────────────┘
                         │ (HTTP REST API)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│          BACKEND LOCAL (localhost:5000/3000)                │
│                                                              │
│  ├─ Node.js / Express (o framework similar)                 │
│  ├─ Rutas API REST                                          │
│  └─ Validaciones y lógica de negocio                        │
└────────────────────────┬────────────────────────────────────┘
                         │ (SQL Queries)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│            BASE DE DATOS LOCAL (localhost)                  │
│                                                              │
│  ├─ MySQL / PostgreSQL                                      │
│  ├─ Tablas: usuarios, reportes, estados, etc.               │
│  └─ Conexión local desde el backend                         │
└─────────────────────────────────────────────────────────────┘
```

### Autenticación

La autenticación se realiza en **dos niveles**:

#### 1️⃣ **Firebase Authentication** (Login/Register)
- Gestión segura de credenciales
- Generación de tokens JWT
- Validación en tiempo real

```javascript
// Flujo de Login con Firebase
1. Usuario ingresa email y contraseña
2. Firebase verifica credenciales
3. Se genera token de autenticación
4. Token se almacena localmente
5. AuthContext se actualiza con datos del usuario
```

#### 2️⃣ **Backend Local** (Validación y Roles)
- Verificación del token en cada request
- Validación de roles (Funcionario / Ciudadano)
- Acceso a datos según permisos

```javascript
// Flujo de Autorización en Backend
1. Frontend envía token en header Authorization
2. Backend valida token con Firebase
3. Backend verifica rol del usuario
4. Backend retorna datos según permisos
```

---

## 🔧 Tecnologías y Dependencias

### Production Dependencies
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.11.0"
}
```

### Dev Dependencies
```json
{
  "@vitejs/plugin-react": "^5.1.1",
  "eslint": "^9.39.1",
  "vite": "^7.2.4"
}
```

> Ver `package.json` para la lista completa y versiones exactas.

---

- **Instalar dependencias:**

  ```bash
  npm install
  ```

- **Desarrollo (hot-reload):**

  ```bash
  npm run dev
  ```

- **Construir para producción:**

  ```bash
  npm run build
  ```

- **Previsualizar build local:**

  ```bash
  npm run preview
  ```

- **Ejecutar ESLint:**

  ```bash
  npm run lint
  ```

---

## 📁 Estructura del proyecto

Resumen de la estructura principal (actualizada):

```
/ (root)
├─ public/
├─ src/
│  ├─ assets/            # imágenes, íconos, etc.
│  ├─ components/        # Navbar.jsx, PrivateRoute.jsx, RoleRoute.jsx
│  ├─ context/           # AuthContext.jsx
│  ├─ firebase/          # firebase.js (configuración)
│  ├─ pages/             # vistas / rutas
│  │   ├─ Home.jsx
│  │   ├─ Dashboard.jsx
│  │   ├─ Login.jsx
│  │   ├─ Register.jsx
│  │   ├─ CrearReporte.jsx
│  │   ├─ MisReportes.jsx
│  │   ├─ DetalleReporteCiudadano.jsx
│  │   ├─ DetalleReporteFuncionario.jsx
│  │   ├─ CambiarEstado.jsx
│  │   ├─ Solicitudes.jsx
│  │   └─ ZonasCriticas.jsx
│  ├─ services/          # api.js (cliente HTTP)
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css / App.css
├─ index.html
├─ package.json
├─ vite.config.js
└─ README.md
```

### 📝 Archivos y carpetas clave

### 📝 Descripción de Módulos Clave

#### `src/context/AuthContext.jsx`
- Gestiona estado global de autenticación
- Provee funciones: `login()`, `logout()`, `register()`
- Almacena datos del usuario autenticado

#### `src/firebase/firebase.js`
- Inicializa Firebase con credenciales
- Expone métodos de autenticación
- Gestiona tokens de sesión

#### `src/services/api.js`
- Cliente HTTP centralizado (Fetch API)
- Incluye interceptores para token JWT
- Maneja errores de autenticación y autorización

#### `src/components/RoleRoute.jsx`
- HOC que valida roles antes de renderizar
- Redirige a login si no está autenticado
- Redirige a acceso denegado si rol no es válido

---

## 🔐 Configuración Local

### Variables de Entorno (.env.local)

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Backend URL (Local)
VITE_API_URL=http://localhost:5000
# O si usas otro puerto:
# VITE_API_URL=http://localhost:3000
```

### Backend Local - Requisitos

Para que la aplicación funcione correctamente, necesitas tener el **backend local en ejecución**:

```bash
# En la carpeta del backend (ej: ecomunigestion-backend)
npm install
npm start

# El backend debe estar disponible en:
# http://localhost:5000 (o el puerto configurado)
```

### Base de Datos Local - Requisitos

La **base de datos también debe estar local** y accesible desde el backend:

```
┌──────────────────────────────────────────────────┐
│ Base de Datos MySQL/PostgreSQL (localhost)       │
├──────────────────────────────────────────────────┤
│ Host:     localhost                              │
│ Puerto:   3306 (MySQL) o 5432 (PostgreSQL)      │
│ Usuario:  [configurar en backend]                │
│ Password: [configurar en backend]                │
│ Base:     ecomunigestion_db                      │
└──────────────────────────────────────────────────┘
```

---

## 🚀 Despliegue en Producción

### Netlify Deployment

El proyecto está desplegado en **Netlify** con integración continua desde Git.

```bash
# Build para producción
npm run build

# Netlify automáticamente:
# 1. Detecta cambios en el repositorio
# 2. Ejecuta npm install
# 3. Ejecuta npm run build
# 4. Despliega la carpeta dist/
```

**URL Producción:** https://glistening-dasik-e0daa0.netlify.app/

---

## 🔄 Flujo de Autenticación y Roles

```
1. ACCESO AL SITIO
   └─► Usuario visita https://glistening-dasik-e0daa0.netlify.app/
       └─► Si no está autenticado → Redirige a /login

2. LOGIN
   └─► Ingresa email y contraseña
       ├─ usr_funcionario@gmail.com (Rol: Funcionario)
       └─ usr_ciudadano@gmail.com (Rol: Ciudadano)
   
   Firebase valida credenciales
   └─► Genera token JWT
   
   Token se guarda en contexto y localStorage
   └─► Componentes acceden a AuthContext

3. NAVEGACIÓN
   └─► PrivateRoute verifica autenticación
   └─► RoleRoute verifica rol específico
   
   ├─ CIUDADANO
   │  ├─ Acceso: Home, Dashboard, CrearReporte, MisReportes
   │  ├─ Acceso: DetalleReporteCiudadano, ZonasCriticas
   │  └─ Restricción: Funciones de administración
   │
   └─ FUNCIONARIO
      ├─ Acceso: Todas las páginas
      ├─ Acceso: Dashboard completo, CambiarEstado
      ├─ Acceso: DetalleReporteFuncionario, Solicitudes
      └─ Acceso: Gestión de reportes

4. LOGOUT
   └─► Se limpia token de Firebase
       └─► Se limpia contexto de autenticación
       └─► Se redirige a /login
```

---

## 🛠️ Desarrollo Local

### Requisitos Previos
- **Node.js** v18+ y **npm** v9+
- **Backend local** en ejecución (puerto 5000 o 3000)
- **Base de datos** local activa
- **Credenciales Firebase** configuradas en `.env.local`

### Pasos para Iniciar

```bash
# 1. Clonar repositorio
git clone <url-del-repositorio>
cd ecomunigestion-frontend

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env.local con credenciales
# (Ver sección "Configuración Local")

# 4. Asegurarse que el backend está corriendo
# En otra terminal: cd ../ecomunigestion-backend && npm start

# 5. Iniciar dev server
npm run dev

# 6. Abrir en navegador
# http://localhost:5173
```

### Linting y Validación

```bash
# Ejecutar ESLint en todos los archivos
npm run lint

# ESLint se ejecutará también como pre-commit si tienes hooks configurados
```

---

## 📋 Checklist de Funcionamiento

Antes de reportar un bug, verifica:

- ✅ Backend local está en ejecución
- ✅ Base de datos está disponible
- ✅ Variables de entorno en `.env.local` están correctas
- ✅ Credenciales de Firebase están vigentes
- ✅ Los usuarios de prueba existen en Firebase
- ✅ Token JWT se está enviando en headers de las requests
- ✅ CORS está configurado en el backend

---

## 📊 Páginas Principales

### Públicas
- `/` — Página de inicio
- `/login` — Formulario de acceso
- `/register` — Formulario de registro

### Protegidas (Requieren autenticación)
- `/dashboard` — Panel principal (diferente según rol)
- `/crear-reporte` — Formulario para nuevo reporte
- `/mis-reportes` — Listado de reportes del usuario

### Funcionalidades por Rol

#### 👨‍💼 Funcionario
- Ver todos los reportes
- Cambiar estado de reportes
- Ver solicitudes pendientes
- Acceso a zonas críticas

#### 👤 Ciudadano
- Crear nuevos reportes
- Ver estado de sus reportes
- Ver zonas críticas
- Consultar historial

---

## 🐛 Solución de Problemas

### Error: "Cannot find module 'firebase'"
```bash
# Solución: Instalar firebase
npm install firebase
```

### Error: "Backend conexión rechazada"
- Verifica que el backend está corriendo
- Verifica que `VITE_API_URL` apunta al puerto correcto

### Error: "Token inválido o expirado"
- Limpia localStorage: `localStorage.clear()`
- Intenta hacer login nuevamente
- Verifica que credenciales Firebase son válidas

### Error: "Acceso denegado por rol"
- Usa el usuario correcto según el rol que necesitas
- Verifica que el backend está retornando el rol correcto

---

## 📚 Documentación Adicional

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Router Documentation](https://reactrouter.com)

---

## 🤝 Contribuciones

1. Crea una rama: `git checkout -b feature/mi-funcionalidad`
2. Haz commit de cambios: `git commit -m "Agregar nueva funcionalidad"`
3. Push a la rama: `git push origin feature/mi-funcionalidad`
4. Abre un Pull Request con descripción clara

---

## 📞 Contacto y Soporte

Para problemas, dudas o sugerencias:
- 📧 Email: [contacto del proyecto]
- 📋 Issues: Abre un issue en el repositorio
- 💬 Discussions: Participa en conversaciones del proyecto

---

## 📄 Licencia

Este proyecto está bajo licencia **MIT**. Ver archivo `LICENSE` para más detalles.

---

**Última actualización:** 20 de enero de 2026
**Estado:** En desarrollo activo
**Versión Frontend:** 0.0.0

