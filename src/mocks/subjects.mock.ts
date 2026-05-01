import type { Subject } from '../types/subject.types';

/**
 * Catálogo de las cinco áreas de evaluación del Saber Pro.
 * Cada campo de color es una clase Tailwind CSS lista para usar.
 */
export const SUBJECTS: Subject[] = [
  {
    id: 'razonamiento-cuantitativo',
    name: 'Razonamiento Cuantitativo',
    description: 'Desarrolla tus habilidades matemáticas, estadísticas y de pensamiento analítico.',
    iconKey: 'calculate',
    accentColor: 'text-blue-600',
    bgColor: 'bg-blue-50 hover:bg-blue-100',
    progressColor: 'bg-blue-500',
    totalQuestions: 60,
  },
  {
    id: 'lectura-critica',
    name: 'Lectura Crítica',
    description: 'Mejora tu comprensión lectora, análisis textual e interpretación de argumentos.',
    iconKey: 'menu-book',
    accentColor: 'text-purple-600',
    bgColor: 'bg-purple-50 hover:bg-purple-100',
    progressColor: 'bg-purple-500',
    totalQuestions: 55,
  },
  {
    id: 'ingles',
    name: 'Inglés',
    description: 'Practica y evalúa tu nivel de comprensión del idioma inglés.',
    iconKey: 'language',
    accentColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50 hover:bg-emerald-100',
    progressColor: 'bg-emerald-500',
    totalQuestions: 45,
  },
  {
    id: 'ciencias-naturales',
    name: 'Ciencias Naturales',
    description: 'Explora conceptos de física, química y biología con enfoque experimental.',
    iconKey: 'science',
    accentColor: 'text-orange-600',
    bgColor: 'bg-orange-50 hover:bg-orange-100',
    progressColor: 'bg-orange-500',
    totalQuestions: 50,
  },
  {
    id: 'competencias-ciudadanas',
    name: 'Competencias Ciudadanas',
    description: 'Refuerza tu conocimiento sobre convivencia, democracia y pluralismo.',
    iconKey: 'account-balance',
    accentColor: 'text-rose-600',
    bgColor: 'bg-rose-50 hover:bg-rose-100',
    progressColor: 'bg-rose-500',
    totalQuestions: 40,
  },
];
