import type { DifficultyTier } from '../types';

export const DIFFICULTY_LABELS: Record<DifficultyTier, string> = {
  basic: 'Básico',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
};

export const getDifficultyTier = (overallCompletionPct: number): DifficultyTier => {
  if (overallCompletionPct >= 80) {
    return 'advanced';
  }

  if (overallCompletionPct >= 40) {
    return 'intermediate';
  }

  return 'basic';
};
