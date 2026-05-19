import type { UserProfile } from '../types';
import { getToken } from './authService';

const USERS_ME_URL: string = import.meta.env.VITE_USERS_ME_URL ?? '/api/users/me';

const resolveErrorMessage = (payload: unknown): string | null => {
  if (typeof payload !== 'object' || payload === null) {
    return null;
  }

  const message = (payload as { message?: unknown }).message;

  if (typeof message === 'string') return message;
  if (Array.isArray(message) && typeof message[0] === 'string') return message[0];

  return null;
};

export const getMyProfile = async (): Promise<UserProfile> => {
  const token = getToken();

  if (!token) {
    throw new Error('No hay una sesion activa.');
  }

  const response = await fetch(USERS_ME_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);

    if (response.status === 401) {
      throw new Error('Tu sesion expiro. Inicia sesion de nuevo.');
    }

    throw new Error(resolveErrorMessage(payload) ?? 'No fue posible cargar tu perfil.');
  }

  return response.json() as Promise<UserProfile>;
};
