import type { RehearsalSessionResult, RehearsalSessionSubmission, SubjectId, WrongAnswer } from '../types';
import { getToken } from './authService';

const REHEARSAL_WRONG_ANSWERS_URL: string =
  import.meta.env.VITE_REHEARSAL_WRONG_ANSWERS_URL ?? '/api/rehearsal/wrong-answers';
const REHEARSAL_SESSIONS_URL: string =
  import.meta.env.VITE_REHEARSAL_SESSIONS_URL ?? '/api/rehearsal/sessions';

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

interface WrongAnswersResponse {
  data: WrongAnswer[];
}

export const getWrongAnswers = async (subjectId: SubjectId): Promise<WrongAnswer[]> => {
  const response = await fetch(`${REHEARSAL_WRONG_ANSWERS_URL}/${subjectId}`, {
    headers: buildAuthHeaders(),
  });

  if (!response.ok) {
    await handleError(response);
  }

  const result = (await response.json()) as WrongAnswersResponse;

  return result.data;
};

export const saveRehearsalSession = async (
  payload: RehearsalSessionSubmission,
): Promise<RehearsalSessionResult> => {
  const response = await fetch(REHEARSAL_SESSIONS_URL, {
    method: 'POST',
    headers: buildAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await handleError(response);
  }

  return response.json() as Promise<RehearsalSessionResult>;
};
