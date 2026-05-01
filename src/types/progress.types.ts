import type { SubjectId } from './subject.types';

/**
 * Estado del progreso de un usuario en una materia específica.
 */
export interface SubjectProgress {
  subjectId: SubjectId;
  /** Número de preguntas respondidas (correctas + incorrectas) */
  completedQuestions: number;
  totalQuestions: number;
  correctAnswers: number;
  /** ISO date string: 'YYYY-MM-DD'. Undefined si nunca se ha practicado. */
  lastAttempt?: string;
}

/**
 * Estado global del progreso de un usuario en todos los módulos.
 */
export interface UserProgress {
  userId: string;
  username: string;
  subjects: Record<SubjectId, SubjectProgress>;
}
