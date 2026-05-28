# EduSaber — Frontend

Interfaz de la plataforma de preparación para el examen SABER PRO, impulsada por modelos de IA fine-tuned.

## Stack

- **Framework**: React 19 + TypeScript
- **Build**: Vite 6
- **UI**: MUI 9 (Material UI) + Tailwind CSS 3
- **Routing**: React Router 7
- **Estado**: Hooks nativos (useState, useEffect, useMemo)
- **Auth**: JWT en localStorage, guard con PrivateRoute

## Requisitos

- Node.js 18+
- Backend EduSaber corriendo (por defecto en `localhost:3000`)

## Instalación

```bash
npm install
```

## Configuración

Variables de entorno en `.env`:

| Variable | Default | Descripción |
|---|---|---|
| `VITE_API_URL` | `/api/questions/generate` | Endpoint de generación de preguntas |
| `VITE_AUTH_URL` | `/api/auth/login` | Endpoint de login |
| `VITE_PROGRESS_ME_URL` | `/api/progress/me` | Dashboard de progreso |
| `VITE_PROGRESS_ATTEMPTS_URL` | `/api/progress/attempts` | Guardado de intentos |
| `VITE_REHEARSAL_WRONG_ANSWERS_URL` | `/api/rehearsal/wrong-answers` | Preguntas incorrectas |
| `VITE_REHEARSAL_SESSIONS_URL` | `/api/rehearsal/sessions` | Sesiones de repaso |

El proxy de Vite redirige `/api/*` a `http://localhost:3000/*` (eliminando el prefijo `/api`).

## Ejecución

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## Páginas

| Ruta | Componente | Auth | Descripción |
|---|---|---|---|
| `/login` | `LoginPage` | No | Login con branding EduSaber |
| `/` | `HomePage` | JWT | Dashboard con materias, progreso y mapa de niveles |
| `/quiz/:subjectId` | `QuizPage` | JWT | Quiz interactivo con generación IA |
| `/quiz/comunicacion-escrita` | `WritingPage` | JWT | Situaciones de escritura con corrección IA |
| `/rehearsal/:subjectId` | `RehearsalPage` | JWT | Repaso de preguntas incorrectas |

## Estructura del proyecto

```
src/
├── components/       # Componentes reutilizables
│   ├── AnswerOptions.tsx    # Opciones A/B/C/D con feedback
│   ├── AnswerFeedback.tsx   # Feedback correcto/incorrecto
│   ├── AppShell.tsx         # Layout con sidebar + chatbot
│   ├── ChatBot.tsx          # Tutor IA flotante
│   ├── CircularProgress.tsx
│   ├── LeaderboardSidebar.tsx
│   ├── LevelMap.tsx         # Mapa de niveles con badge de dificultad
│   ├── Navbar.tsx
│   ├── ProgressBar.tsx
│   ├── ProgressSidebar.tsx
│   ├── QuizResults.tsx      # Pantalla de resultados
│   ├── SubjectCard.tsx      # Tarjeta de materia con "Repasar errores"
│   └── ThemeProvider.tsx
├── hooks/
│   ├── useChatBot.ts
│   ├── useLeaderboard.ts
│   ├── useQuiz.ts           # Sesión de quiz con dificultad
│   ├── useRehearsal.ts      # Sesión de repaso
│   └── useUserProgress.ts   # Dashboard + utilidad de dificultad
├── pages/
│   ├── HomePage.tsx
│   ├── LoginPage.tsx         # Split layout con info panel
│   ├── QuizPage.tsx
│   ├── WritingPage.tsx
│   └── RehearsalPage.tsx
├── services/
│   ├── authService.ts        # Login, logout, token
│   ├── chatService.ts
│   ├── leaderboardService.ts
│   ├── progressService.ts
│   ├── questionService.ts    # Fetch de preguntas con dificultad
│   ├── rehearsalService.ts   # Wrong answers + sesiones
│   └── userService.ts        # Perfil
├── utils/
│   └── difficulty.ts         # getDifficultyTier(), DIFFICULTY_LABELS
├── mocks/
│   ├── data.mock.ts          # Materias y constantes
│   └── questions.mock.ts
├── types.ts                  # Tipos compartidos
├── App.tsx                   # Rutas + PrivateRoute
└── main.tsx
```

## Autenticación

1. Usuario hace POST `/auth/login` con email + password
2. Backend valida contra Supabase Auth y retorna `access_token`
3. Frontend guarda el token en `localStorage`
4. Todas las requests autenticadas usan `Authorization: Bearer <token>`
5. `PrivateRoute` redirige a `/login` si no hay token
6. Si el backend retorna 401, el frontend fuerza logout

## Sistema de dificultad

La dificultad de preguntas se calcula a partir del progreso del usuario:

| Completitud | Tier | Niveles del mapa |
|---|---|---|
| 0–39% | `basic` | Explorador, Aprendiz |
| 40–79% | `intermediate` | Practicante, Avanzado |
| 80–100% | `advanced` | Experto, Maestro |

El `LevelMap` muestra el tier activo como badge (Básico/Intermedio/Avanzado).

Flujo:
1. `useUserProgress()` obtiene `overallCompletionPct` del backend
2. `getDifficultyTier(pct)` compute el tier
3. `QuizPage` pasa el tier a `useQuiz`
4. `useQuiz` incluye `dificultad` en el body del POST a `/questions/generate`

## Materias

| ID | Nombre | Icono |
|---|---|---|
| `razonamiento-cuantitativo` | Razonamiento Cuantitativo | Calculate |
| `lectura-critica` | Lectura Crítica | MenuBook |
| `ingles` | Inglés | Language |
| `competencias-ciudadanas` | Competencias Ciudadanas | AccountBalance |
| `comunicacion-escrita` | Comunicación Escrita | EditNote |

> **Nota**: `lectura-critica` no tiene generación de preguntas habilitada actualmente. `comunicacion-escrita` usa situaciones de escritura, no quiz de opción múltiple.

## Repaso de errores

La página `/rehearsal/:subjectId` muestra las preguntas que el usuario respondió incorrectamente, excluyendo las que ya re-practicó correctamente. Las sesiones de repaso **no afectan** XP, racha ni progreso.

## Tema claro/oscuro

El theme se controla desde el sidebar y se persiste en `localStorage`. Tailwind usa clases `dark:` para el modo oscuro.