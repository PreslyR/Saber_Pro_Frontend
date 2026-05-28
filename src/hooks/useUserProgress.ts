import { useEffect, useMemo, useState } from 'react';
import type { SubjectId, SubjectProgress, UserProgress, UserStats } from '../types';
import { SUBJECTS } from '../mocks/data.mock';
import { getMyProgress } from '../services/progressService';

interface UseUserProgressReturn {
  userProgress: UserProgress;
  stats: UserStats;
  getSubjectProgress: (subjectId: SubjectId) => SubjectProgress;
  overallCompletionPct: number;
  overallAccuracyPct: number;
  isLoading: boolean;
  error: string | null;
}

const DEFAULT_STATS: UserStats = {
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  streak: 0,
  questionsToday: 0,
  dailyGoalCompleted: 0,
  dailyGoalTarget: 10,
  overallCompletionPct: 0,
  objective: {
    name: 'Saber Pro ICFES',
    description: 'Prepararte para el examen de estado con practica constante en todas las areas evaluadas.',
  },
};

const buildEmptySubjects = (): Record<SubjectId, SubjectProgress> =>
  SUBJECTS.reduce(
    (acc, subject) => {
      acc[subject.id] = {
        subjectId: subject.id,
        completedQuestions: 0,
        totalQuestions: subject.totalQuestions,
        correctAnswers: 0,
      };

      return acc;
    },
    {} as Record<SubjectId, SubjectProgress>,
  );

const EMPTY_USER_PROGRESS: UserProgress = {
  userId: 'guest',
  username: 'Estudiante',
  subjects: buildEmptySubjects(),
};

export const useUserProgress = (): UseUserProgressReturn => {
  const [userProgress, setUserProgress] = useState<UserProgress>(EMPTY_USER_PROGRESS);
  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProgress = async () => {
      try {
        const dashboard = await getMyProgress();

        if (!isMounted) return;

        setUserProgress(dashboard.userProgress);
        setStats(dashboard.stats);
        setError(null);
      } catch (err) {
        if (!isMounted) return;

        setError(err instanceof Error ? err.message : 'No fue posible cargar tu progreso.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadProgress();

    return () => {
      isMounted = false;
    };
  }, []);

  const overallCompletionPct = useMemo(() => {
    const values = Object.values(userProgress.subjects);
    const totalCompleted = values.reduce(
      (acc, subject) => acc + Math.min(subject.completedQuestions, subject.totalQuestions),
      0,
    );
    const totalQuestions = values.reduce((acc, subject) => acc + subject.totalQuestions, 0);

    if (totalQuestions === 0) return 0;

    return Math.round((totalCompleted / totalQuestions) * 100);
  }, [userProgress]);

  const overallAccuracyPct = useMemo(() => {
    const values = Object.values(userProgress.subjects);
    const totalCorrect = values.reduce((acc, subject) => acc + subject.correctAnswers, 0);
    const totalCompleted = values.reduce((acc, subject) => acc + subject.completedQuestions, 0);

    if (totalCompleted === 0) return 0;

    return Math.round((totalCorrect / totalCompleted) * 100);
  }, [userProgress]);

  const getSubjectProgress = (subjectId: SubjectId): SubjectProgress =>
    userProgress.subjects[subjectId];

  return {
    userProgress,
    stats,
    getSubjectProgress,
    overallCompletionPct,
    overallAccuracyPct,
    isLoading,
    error,
  };
};
