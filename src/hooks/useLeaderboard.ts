import { useEffect, useState } from 'react';
import type { LeaderboardEntry } from '../types';
import { getLeaderboard } from '../services/leaderboardService';

interface UseLeaderboardReturn {
  entries: LeaderboardEntry[];
  isLoading: boolean;
  error: string | null;
}

export const useLeaderboard = (): UseLeaderboardReturn => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const data = await getLeaderboard();

        if (!isMounted) return;

        setEntries(data.entries);
      } catch (err) {
        if (!isMounted) return;

        setError(err instanceof Error ? err.message : 'Error al cargar el ranking.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      isMounted = false;
    };
  }, []);

  return { entries, isLoading, error };
};
