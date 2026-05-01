import type { UserProgress } from '../types/progress.types';

/**
 * Datos de progreso simulados para desarrollo y pruebas.
 * Reemplazar con llamada a API o estado global (Zustand / Redux) cuando esté disponible.
 */
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
    'ciencias-naturales': {
      subjectId: 'ciencias-naturales',
      completedQuestions: 0,
      totalQuestions: 50,
      correctAnswers: 0,
    },
    'competencias-ciudadanas': {
      subjectId: 'competencias-ciudadanas',
      completedQuestions: 30,
      totalQuestions: 40,
      correctAnswers: 26,
      lastAttempt: '2026-04-29',
    },
  },
};
