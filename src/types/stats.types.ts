/**
 * Estadísticas de gamificación y metas del usuario.
 */
export interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  /** Racha de días consecutivos estudiando */
  streak: number;
  /** Preguntas respondidas hoy */
  questionsToday: number;
  /** Sesiones completadas hoy */
  dailyGoalCompleted: number;
  /** Meta diaria de sesiones */
  dailyGoalTarget: number;
  objective: {
    name: string;
    description: string;
  };
}
