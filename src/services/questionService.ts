import type { QuizQuestion, SubjectId, OptionId } from '../types';
import { getToken } from './authService';

const API_URL: string = import.meta.env.VITE_API_URL;
if (!API_URL) {
  throw new Error('VITE_API_URL no está definida. Verifica el archivo .env y reinicia el servidor de desarrollo.');
}

const SUBJECT_COMPETENCIA: Partial<Record<SubjectId, string>> = {
  'razonamiento-cuantitativo': 'Razonamiento cuantitativo',
  'competencias-ciudadanas': 'Competencias ciudadanas',
  'ingles': 'Inglés',
};

interface ApiQuestion {
  enunciado: string;
  opciones: { A: string; B: string; C: string; D: string };
  respuesta_correcta: OptionId;
  explicacion: string;
}

const mapApiQuestion = (
  raw: ApiQuestion,
  subjectId: SubjectId,
  index: number,
): QuizQuestion => ({
  id: `${subjectId}-${Date.now()}-${index}`,
  subjectId,
  statement: raw.enunciado,
  options: [
    { id: 'A', text: raw.opciones.A },
    { id: 'B', text: raw.opciones.B },
    { id: 'C', text: raw.opciones.C },
    { id: 'D', text: raw.opciones.D },
  ],
  correctOptionId: raw.respuesta_correcta,
  explanation: raw.explicacion,
});

const fetchSingleQuestion = async (competencia: string): Promise<ApiQuestion> => {
  const token = getToken();
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ competencia }),
  });
  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Error del servidor:', response.status, errorBody);
    throw new Error(`Error al obtener pregunta: ${response.status} - ${errorBody}`);
  }
  return response.json() as Promise<ApiQuestion>;
};

export const fetchQuestionsForSubject = async (
  subjectId: SubjectId,
  count: number = 20,
): Promise<QuizQuestion[]> => {
  const competencia = SUBJECT_COMPETENCIA[subjectId];
  if (!competencia) {
    throw new Error('Esta área de evaluación aún no está disponible en el servidor.');
  }
  const requests = Array.from({ length: count }, (_, i) =>
    fetchSingleQuestion(competencia).then((raw) => mapApiQuestion(raw, subjectId, i)),
  );
  return Promise.all(requests);
};
