import type { Subject } from '../types';

export const SUBJECTS: Subject[] = [
  {
    id: 'razonamiento-cuantitativo',
    name: 'Razonamiento Cuantitativo',
    description:
      'Desarrolla tus habilidades matematicas, estadisticas y de pensamiento analitico.',
    iconKey: 'calculate',
    accentColor: 'text-blue-600',
    bgColor: 'bg-blue-50 hover:bg-blue-100',
    progressColor: 'bg-blue-500',
    totalQuestions: 60,
  },
  {
    id: 'lectura-critica',
    name: 'Lectura Critica',
    description:
      'Mejora tu comprension lectora, analisis textual e interpretacion de argumentos.',
    iconKey: 'menu-book',
    accentColor: 'text-purple-600',
    bgColor: 'bg-purple-50 hover:bg-purple-100',
    progressColor: 'bg-purple-500',
    totalQuestions: 55,
  },
  {
    id: 'ingles',
    name: 'Ingles',
    description: 'Practica y evalua tu nivel de comprension del idioma ingles.',
    iconKey: 'language',
    accentColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50 hover:bg-emerald-100',
    progressColor: 'bg-emerald-500',
    totalQuestions: 45,
  },
  {
    id: 'competencias-ciudadanas',
    name: 'Competencias Ciudadanas',
    description:
      'Refuerza tu conocimiento sobre convivencia, democracia y pluralismo.',
    iconKey: 'account-balance',
    accentColor: 'text-rose-600',
    bgColor: 'bg-rose-50 hover:bg-rose-100',
    progressColor: 'bg-rose-500',
    totalQuestions: 40,
  },
  {
    id: 'comunicacion-escrita',
    name: 'Comunicacion Escrita',
    description:
      'Desarrolla tu capacidad para producir textos coherentes, claros y con argumentos solidos.',
    iconKey: 'edit-note',
    accentColor: 'text-teal-600',
    bgColor: 'bg-teal-50 hover:bg-teal-100',
    progressColor: 'bg-teal-500',
    totalQuestions: 35,
  },
];
