/**
 * Identificador único para cada área de evaluación del Saber Pro.
 */
export type SubjectId =
  | 'razonamiento-cuantitativo'
  | 'lectura-critica'
  | 'ingles'
  | 'ciencias-naturales'
  | 'competencias-ciudadanas';

/**
 * Clave que identifica el ícono de MUI para la materia.
 * Cada valor mapea a un componente de @mui/icons-material en SubjectCard.
 */
export type SubjectIconKey =
  | 'calculate'
  | 'menu-book'
  | 'language'
  | 'science'
  | 'account-balance';

/**
 * Información estática de una materia: metadatos de presentación.
 */
export interface Subject {
  id: SubjectId;
  name: string;
  description: string;
  /** Clave del ícono MUI representativo de la materia */
  iconKey: SubjectIconKey;
  /** Clase Tailwind para el color del texto de acento */
  accentColor: string;
  /** Clase Tailwind para el color de fondo de la tarjeta */
  bgColor: string;
  /** Clase Tailwind para la barra de progreso */
  progressColor: string;
  totalQuestions: number;
}
