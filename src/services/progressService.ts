import type { ProgressDashboardResponse, QuizAttemptSubmission } from '../types';
import { getToken } from './authService';

const PROGRESS_ME_URL: string =
  import.meta.env.VITE_PROGRESS_ME_URL ?? '/api/progress/me';
const PROGRESS_ATTEMPTS_URL: string =
  import.meta.env.VITE_PROGRESS_ATTEMPTS_URL ?? '/api/progress/attempts';

const resolveErrorMessage = (payload: unknown): string | null => {
  if (typeof payload === 'object' && payload !== null) {
    const message = (payload as { message?: unknown }).message;

    if (typeof message === 'string') return message;
    if (Array.isArray(message) && typeof message[0] === 'string') return message[0];
  }

  return null;
};

const buildAuthHeaders = (): HeadersInit => {
  const token = getToken();

  if (!token) {
    throw new Error('No hay una sesion activa.');
  }

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

const handleError = async (response: Response): Promise<never> => {
  const payload = await response.json().catch(() => null);

  if (response.status === 401) {
    throw new Error('Tu sesion expiro. Inicia sesion de nuevo.');
  }

  throw new Error(resolveErrorMessage(payload) ?? 'No fue posible completar la solicitud.');
};

export const getMyProgress = async (): Promise<ProgressDashboardResponse> => {
  const response = await fetch(PROGRESS_ME_URL, {
    headers: buildAuthHeaders(),
  });

  if (!response.ok) {
    await handleError(response);
  }

  return response.json() as Promise<ProgressDashboardResponse>;
};

export const saveQuizAttempt = async (payload: QuizAttemptSubmission): Promise<void> => {
  const response = await fetch(PROGRESS_ATTEMPTS_URL, {
    method: 'POST',
    headers: buildAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await handleError(response);
  }
};
