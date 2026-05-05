import type { Subject, UserProgress, UserStats } from '../types';

export const SUBJECTS: Subject[] = [
  {
    id: 'razonamiento-cuantitativo',
    name: 'Razonamiento Cuantitativo',
    description: 'Desarrolla tus habilidades matemáticas, estadísticas y de pensamiento analítico.',
    iconKey: 'calculate',
    accentColor: 'text-blue-600',
    bgColor: 'bg-blue-50 hover:bg-blue-100',
    progressColor: 'bg-blue-500',
    totalQuestions: 60,
  },
  {
    id: 'lectura-critica',
    name: 'Lectura Crítica',
    description: 'Mejora tu comprensión lectora, análisis textual e interpretación de argumentos.',
    iconKey: 'menu-book',
    accentColor: 'text-purple-600',
    bgColor: 'bg-purple-50 hover:bg-purple-100',
    progressColor: 'bg-purple-500',
    totalQuestions: 55,
  },
  {
    id: 'ingles',
    name: 'Inglés',
    description: 'Practica y evalúa tu nivel de comprensión del idioma inglés.',
    iconKey: 'language',
    accentColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50 hover:bg-emerald-100',
    progressColor: 'bg-emerald-500',
    totalQuestions: 45,
  },
  
  {
    id: 'competencias-ciudadanas',
    name: 'Competencias Ciudadanas',
    description: 'Refuerza tu conocimiento sobre convivencia, democracia y pluralismo.',
    iconKey: 'account-balance',
    accentColor: 'text-rose-600',
    bgColor: 'bg-rose-50 hover:bg-rose-100',
    progressColor: 'bg-rose-500',
    totalQuestions: 40,
  },
  {
    id: 'comunicacion-escrita',
    name: 'Comunicación Escrita',
    description: 'Desarrolla tu capacidad para producir textos coherentes, claros y con argumentos sólidos.',
    iconKey: 'edit-note',
    accentColor: 'text-teal-600',
    bgColor: 'bg-teal-50 hover:bg-teal-100',
    progressColor: 'bg-teal-500',
    totalQuestions: 35,
  },
];

export const MOCK_USER_PROGRESS: UserProgress = {
  userId: 'user-001',
  username: 'Estudiante',
  subjects: {
    'razonamiento-cuantitativo': {
      subjectId: 'razonamiento-cuantitativo',
      completedQuestions: 24,
      totalQuestions: 60,
      correctAnswers: 18,
      lastAttempt: '2026-04-28',
    },
    'lectura-critica': {
      subjectId: 'lectura-critica',
      completedQuestions: 40,
      totalQuestions: 55,
      correctAnswers: 35,
      lastAttempt: '2026-04-30',
    },
    ingles: {
      subjectId: 'ingles',
      completedQuestions: 10,
      totalQuestions: 45,
      correctAnswers: 8,
      lastAttempt: '2026-04-25',
    },
    
    'competencias-ciudadanas': {
      subjectId: 'competencias-ciudadanas',
      completedQuestions: 30,
      totalQuestions: 40,
      correctAnswers: 26,
      lastAttempt: '2026-04-29',
    },
    'comunicacion-escrita': {
      subjectId: 'comunicacion-escrita',
      completedQuestions: 0,
      totalQuestions: 35,
      correctAnswers: 0,
    },
  },
};

export const MOCK_USER_STATS: UserStats = {
  level: 3,
  xp: 48,
  xpToNextLevel: 100,
  streak: 5,
  questionsToday: 7,
  dailyGoalCompleted: 2,
  dailyGoalTarget: 10,
  objective: {
    name: 'Saber Pro (ECAES)',
    description: 'Para universitarios — evaluación de calidad',
  },
};
