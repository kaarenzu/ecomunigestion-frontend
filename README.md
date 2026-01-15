# ecomunigestion-frontend ✅

Frontend de la aplicación **ecomunigestion** — una SPA construida con **React** y **Vite**.

---
## 🚧 Estado del proyecto

El frontend del sistema se encuentra en fase inicial de desarrollo.
Actualmente se han definido la estructura base de la aplicación, el sistema de ruteo
y las páginas principales asociadas al flujo de reportes ciudadanos.
La integración con el backend y la base de datos se encuentra planificada
para las siguientes etapas del proyecto.


## 🔧 Tecnologías

- **Framework:** React 19
- **Bundler / Dev server:** Vite
- **Ruteo:** react-router-dom
- **Linting:** ESLint

> Versión y dependencias principales están en `package.json`.

---

## ⚙️ Scripts útiles

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

- `src/pages/` — Páginas principales (Home, Dashboard, Login, Register, CrearReporte, MisReportes, DetalleReporte*, CambiarEstado, Solicitudes, ZonasCriticas).
- `src/components/` — Componentes reutilizables (p. ej. `Navbar.jsx`, `PrivateRoute.jsx`, `RoleRoute.jsx`).
- `src/context/` — Contextos de React (`AuthContext.jsx`).
- `src/firebase/` — Configuración de Firebase (`firebase.js`).
- `src/services/` — Lógica para llamadas a la API (`api.js`).
- `src/assets/` — Recursos estáticos (imágenes, íconos, etc.).

---



---

## 💡 Cómo comenzar (rápido)

1. Clona el repositorio.
2. Ejecuta `npm install`.
3. Ejecuta `npm run dev` y abre `http://localhost:5173` (o el puerto que indique Vite).

---

## ✅ Chequeos y recomendaciones

- Ejecuta `npm run lint` para revisar reglas de ESLint.
- Agrega variables de entorno (si las hay) en `.env` o `.env.local` según necesites.
- Añade tests y storybook si deseas mejorar la cobertura y documentación de componentes.

---

## 🤝 Contribuciones

1. Haz un fork y crea una rama: `feature/mi-cambio`.
2. Abre un PR con descripción clara de los cambios.

---

## 📬 Contacto

Si necesitas que incluya diagramas, ejemplos de env vars, o capturas de pantalla en el README, dímelo y lo agrego.

---

**Licencia:** MIT (o la que prefieras)

