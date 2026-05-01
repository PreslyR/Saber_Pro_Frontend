import type { UserStats } from '../types/stats.types';

/**
 * Estadísticas simuladas de gamificación.
 * Reemplazar con llamada a API o store global cuando esté disponible.
 */
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
