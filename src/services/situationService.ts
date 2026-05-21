import { getToken } from './authService';
import type { Situation, SituationValidationResult } from '../types';

const SITUATIONS_URL: string = import.meta.env.VITE_SITUATIONS_URL ?? '/api/situaciones/generate';
const SITUATIONS_VALIDATE_URL: string =
  import.meta.env.VITE_SITUATIONS_VALIDATE_URL ?? '/api/situaciones/validate';

interface ApiSituation {
  situacion: string;
  instrucciones: string;
  criterios: string[];
}

interface ApiValidationResult {
  feedback: string;
  puntaje?: number;
}

export const fetchSituation = async (): Promise<Situation> => {
  const token = getToken();
  const response = await fetch(SITUATIONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Error al obtener situación: ${response.status} - ${body}`);
  }

  const data = (await response.json()) as ApiSituation;
  return {
    id: `situation-${Date.now()}`,
    text: data.situacion,
    instruction: data.instrucciones,
    criteria: data.criterios,
  };
};

export const validateWritingAnswer = async (
  situationId: string,
  answer: string,
): Promise<SituationValidationResult> => {
  const token = getToken();
  const response = await fetch(SITUATIONS_VALIDATE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ situacionId: situationId, respuesta: answer }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Error al validar respuesta: ${response.status} - ${body}`);
  }

  const data = (await response.json()) as ApiValidationResult;
  return {
    feedback: data.feedback,
    score: data.puntaje,
  };
};
