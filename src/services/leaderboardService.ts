import type { LeaderboardResponse } from '../types';
import { getToken } from './authService';

const LEADERBOARD_URL: string =
  import.meta.env.VITE_LEADERBOARD_URL ?? '/api/leaderboard';

const buildAuthHeaders = (): HeadersInit => {
  const token = getToken();

  if (!token) {
    throw new Error('No hay una sesion activa.');
  }

  return { Authorization: `Bearer ${token}` };
};

export const getLeaderboard = async (): Promise<LeaderboardResponse> => {
  const response = await fetch(LEADERBOARD_URL, {
    headers: buildAuthHeaders(),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Tu sesion expiro. Inicia sesion de nuevo.');
    }

    throw new Error('No fue posible cargar el ranking.');
  }

  return response.json() as Promise<LeaderboardResponse>;
};
