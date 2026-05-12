# Profedex

![Logo de Profedex](src/app/icon.ico)

**Profedex** es una plataforma web diseñada para que los estudiantes del Instituto Tecnológico de Durango (ITD) puedan evaluar a sus profesores y compartir opiniones, mejorando así la experiencia educativa.

## Características principales

- 📊 **Calificaciones objetivas**: Evalúa a los profesores en aspectos clave como claridad, puntualidad, empatía y más.
- 💬 **Comentarios**: Comparte tu experiencia de manera segura y bajo tu propia identidad.
- 🔍 **Búsqueda de profesores**: Encuentra a cualquier profesor y revisa las opiniones de otros estudiantes.
- 🛠️ **Actualizaciones constantes**: Corrección de errores y mejoras continuas para una mejor experiencia.

## Requisitos

- Node.js (v20 o superior)
- Bun (https://bun.sh)
- Git

## Instalación

Sigue estos pasos para ejecutar Profedex en tu máquina local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/[usuario]/profedex.git
   ```
2. Navega a la carpeta del proyecto:
   ```bash
   cd profedex
   ```
3. Instala las dependencias:

   ```bash
   bun install
   ```

4. Configura las variables de entorno:  
   Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables (debes obtenerlas de un administrador del proyecto):

   ```plaintext
   TURSO_AUTH_TOKEN=tu-token-de-base-de-datos
   TURSO_DATABASE_URL=tu-url-de-base-de-datos
   NEXTAUTH_SECRET=tu-token-de-autenticacion
   RESEND_API_KEY=tu-api-key-de-resend
   ```

5. Inicia el servidor local:
   ```bash
   bun dev
   ```

Ahora puedes acceder a Profedex en tu navegador desde `http://localhost:3000`.

## Contribución

¡Las contribuciones son bienvenidas! Si deseas contribuir a Profedex, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu feature o corrección utilizando la siguiente convención de nombres:
   - Para nuevas funcionalidades: `feature/nombre-de-la-funcionalidad`
   - Para correcciones de errores: `fix/nombre-del-bug`

   ```bash
   git checkout -b nombre-de-tu-rama
   ```

3. Realiza tus cambios y haz commit:
   ```bash
   git commit -m "Descripción de los cambios"
   ```
4. Sube tus cambios:
   ```bash
   git push origin nombre-de-tu-rama
   ```
5. Abre un Pull Request hacia la rama `dev` para revisión.

## Variables de entorno

Para ejecutar Profedex correctamente, necesitas configurar las variables de entorno mencionadas anteriormente. Estas incluyen URLs y claves privadas para la API del proyecto y otros servicios.

**Importante**: No compartas ni publiques las claves de entorno sensibles. Solo los colaboradores autorizados deberían tener acceso a ellas.

## Licencia

Este proyecto está bajo una licencia personalizada. Consulta el archivo `LICENSE` para más detalles.
