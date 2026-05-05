import type { QuizQuestion } from '../types';

/**
 * Banco de preguntas de muestra por materia.
 * Reemplazar con llamada a API cuando el backend esté disponible.
 */
export const MOCK_QUESTIONS: QuizQuestion[] = [
  // ── Razonamiento Cuantitativo ──────────────────────────────────────────
  {
    id: 'rc-001',
    subjectId: 'razonamiento-cuantitativo',
    statement:
      'Si el 30% de un número es 75, ¿cuál es el 50% de ese mismo número?',
    options: [
      { id: 'A', text: '100' },
      { id: 'B', text: '115' },
      { id: 'C', text: '125' },
      { id: 'D', text: '150' },
    ],
    correctOptionId: 'C',
    explanation:
      'El 30% del número es 75, por tanto el número es 75 / 0,30 = 250. El 50% de 250 = 125.',
  },
  {
    id: 'rc-002',
    subjectId: 'razonamiento-cuantitativo',
    statement:
      'Una tienda vende un artículo con un descuento del 20% sobre el precio original. Si el precio original es $80.000, ¿cuál es el precio final?',
    options: [
      { id: 'A', text: '$60.000' },
      { id: 'B', text: '$64.000' },
      { id: 'C', text: '$68.000' },
      { id: 'D', text: '$72.000' },
    ],
    correctOptionId: 'B',
    explanation:
      'El descuento es el 20% de $80.000 = $16.000. Precio final = $80.000 − $16.000 = $64.000.',
  },
  {
    id: 'rc-003',
    subjectId: 'razonamiento-cuantitativo',
    statement:
      'En una secuencia numérica: 2, 5, 10, 17, 26, ___ ¿cuál es el siguiente número?',
    options: [
      { id: 'A', text: '35' },
      { id: 'B', text: '36' },
      { id: 'C', text: '37' },
      { id: 'D', text: '38' },
    ],
    correctOptionId: 'C',
    explanation:
      'Las diferencias entre términos son 3, 5, 7, 9, 11 (impares consecutivos). El siguiente es 26 + 11 = 37.',
  },

  // ── Lectura Crítica ───────────────────────────────────────────────────
  {
    id: 'lc-001',
    subjectId: 'lectura-critica',
    statement:
      'Lee el siguiente fragmento: "La democracia no es solamente el derecho a votar; es el derecho a vivir en dignidad". ¿Cuál es la idea principal del texto?',
    options: [
      { id: 'A', text: 'El voto es el único elemento de la democracia.' },
      { id: 'B', text: 'La democracia implica más que el ejercicio del voto.' },
      { id: 'C', text: 'La dignidad humana no tiene relación con la política.' },
      { id: 'D', text: 'Votar es una obligación, no un derecho.' },
    ],
    correctOptionId: 'B',
    explanation:
      'El autor amplía el concepto de democracia más allá del voto, incluyendo el derecho a vivir con dignidad.',
  },
  {
    id: 'lc-002',
    subjectId: 'lectura-critica',
    statement:
      '"Todos los estudiantes que estudian pasan el examen. Pedro estudió. Por lo tanto, Pedro pasó el examen." ¿Qué tipo de argumento es este?',
    options: [
      { id: 'A', text: 'Inductivo' },
      { id: 'B', text: 'Analógico' },
      { id: 'C', text: 'Deductivo' },
      { id: 'D', text: 'Abductivo' },
    ],
    correctOptionId: 'C',
    explanation:
      'Es un silogismo deductivo: la conclusión se deriva necesariamente de las premisas generales.',
  },

  // ── Inglés ────────────────────────────────────────────────────────────
  {
    id: 'en-001',
    subjectId: 'ingles',
    statement:
      'Choose the correct option to complete the sentence: "She ___ to the store before it closed."',
    options: [
      { id: 'A', text: 'goes' },
      { id: 'B', text: 'has gone' },
      { id: 'C', text: 'went' },
      { id: 'D', text: 'go' },
    ],
    correctOptionId: 'C',
    explanation:
      '"Went" is the simple past of "go", which is used for a completed action at a specific past time.',
  },
  {
    id: 'en-002',
    subjectId: 'ingles',
    statement: 'What is the meaning of the word "ambiguous"?',
    options: [
      { id: 'A', text: 'Clear and easy to understand' },
      { id: 'B', text: 'Having more than one possible meaning' },
      { id: 'C', text: 'Completely false' },
      { id: 'D', text: 'Related to numbers' },
    ],
    correctOptionId: 'B',
    explanation:
      '"Ambiguous" means open to more than one interpretation; not having a single clear meaning.',
  },

  // ── Competencias Ciudadanas ───────────────────────────────────────────
  {
    id: 'cc-001',
    subjectId: 'competencias-ciudadanas',
    statement:
      '¿Cuál de los siguientes mecanismos de participación ciudadana permite a los ciudadanos revocar el mandato de un alcalde?',
    options: [
      { id: 'A', text: 'Referendo' },
      { id: 'B', text: 'Plebiscito' },
      { id: 'C', text: 'Revocatoria del mandato' },
      { id: 'D', text: 'Iniciativa legislativa' },
    ],
    correctOptionId: 'C',
    explanation:
      'La revocatoria del mandato es el mecanismo constitucional que permite a los ciudadanos destituir a gobernadores y alcaldes antes de terminar su período.',
  },

 

  // ── Comunicación Escrita ──────────────────────────────────────────────
  {
    id: 'ce-001',
    subjectId: 'comunicacion-escrita',
    statement:
      '¿Cuál de los siguientes elementos es fundamental para garantizar la coherencia de un texto argumentativo?',
    options: [
      { id: 'A', text: 'Usar palabras muy técnicas y complejas' },
      { id: 'B', text: 'Presentar ideas relacionadas de forma lógica y secuencial' },
      { id: 'C', text: 'Repetir la tesis al inicio de cada párrafo sin variación' },
      { id: 'D', text: 'Evitar el uso de conectores discursivos' },
    ],
    correctOptionId: 'B',
    explanation:
      'La coherencia textual requiere que las ideas estén organizadas de manera lógica, con una progresión temática clara y conectores que articulen las partes del texto.',
  },
];

/**
 * Devuelve las preguntas filtradas por área.
 */
export const getQuestionsBySubject = (subjectId: string): QuizQuestion[] =>
  MOCK_QUESTIONS.filter((q) => q.subjectId === subjectId);
