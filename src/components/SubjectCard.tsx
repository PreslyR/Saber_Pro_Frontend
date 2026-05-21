import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import type { Subject, SubjectIconKey, SubjectProgress } from '../types';
import { ProgressBar } from './ProgressBar';

const ICON_MAP: Record<SubjectIconKey, React.ReactNode> = {
  calculate: <CalculateOutlinedIcon />,
  'menu-book': <MenuBookOutlinedIcon />,
  language: <LanguageIcon />,
  science: <ScienceOutlinedIcon />,
  'account-balance': <AccountBalanceOutlinedIcon />,
  'edit-note': <EditNoteOutlinedIcon />,
};

interface SubjectCardProps {
  subject: Subject;
  progress: SubjectProgress;
  onSelect: (subjectId: string) => void;
  locked?: boolean;
}

const GRADIENT_BAR_MAP: Record<Subject['id'], string> = {
  'razonamiento-cuantitativo': 'bg-gradient-to-r from-blue-500 to-blue-400',
  'lectura-critica': 'bg-gradient-to-r from-purple-500 to-violet-400',
  ingles: 'bg-gradient-to-r from-emerald-500 to-teal-400',
  'competencias-ciudadanas': 'bg-gradient-to-r from-rose-500 to-pink-400',
  'comunicacion-escrita': 'bg-gradient-to-r from-teal-500 to-cyan-400',
};

const ICON_BG_MAP: Record<Subject['id'], string> = {
  'razonamiento-cuantitativo': 'bg-blue-50 dark:bg-blue-950/40',
  'lectura-critica': 'bg-purple-50 dark:bg-purple-950/40',
  ingles: 'bg-emerald-50 dark:bg-emerald-950/40',
  'competencias-ciudadanas': 'bg-rose-50 dark:bg-rose-950/40',
  'comunicacion-escrita': 'bg-teal-50 dark:bg-teal-950/40',
};

const DARK_ACCENT_CLASS: Record<Subject['id'], string> = {
  'razonamiento-cuantitativo': 'dark:text-blue-300',
  'lectura-critica': 'dark:text-purple-300',
  ingles: 'dark:text-emerald-300',
  'competencias-ciudadanas': 'dark:text-rose-300',
  'comunicacion-escrita': 'dark:text-teal-300',
};

const DECORATIVE_SYMBOL_MAP: Record<Subject['id'], string> = {
  'razonamiento-cuantitativo': 'π',
  'lectura-critica': '\u201C',
  ingles: 'B2',
  'competencias-ciudadanas': '§',
  'comunicacion-escrita': '¶',
};

const AREA_TAG_MAP: Record<Subject['id'], { label: string; className: string }> = {
  'razonamiento-cuantitativo': {
    label: 'Matemáticas & Estadística',
    className: 'bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300',
  },
  'lectura-critica': {
    label: 'Comprensión lectora',
    className: 'bg-purple-100 text-purple-600 dark:bg-purple-950/50 dark:text-purple-300',
  },
  ingles: {
    label: 'Idioma · Nivel B2',
    className: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300',
  },
  'competencias-ciudadanas': {
    label: 'Cívica & Democracia',
    className: 'bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-300',
  },
  'comunicacion-escrita': {
    label: 'Escritura & Argumentación',
    className: 'bg-teal-100 text-teal-600 dark:bg-teal-950/50 dark:text-teal-300',
  },
};

const resolveAccuracyLabel = (accuracyPct: number): { text: string; className: string } => {
  if (accuracyPct >= 70) {
    return {
      text: 'Bueno',
      className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300',
    };
  }
  if (accuracyPct >= 40) {
    return {
      text: 'Regular',
      className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-300',
    };
  }
  return {
    text: 'Por mejorar',
    className: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300',
  };
};

export const SubjectCard = ({ subject, progress, onSelect, locked = false }: SubjectCardProps) => {
  const displayedCompletedQuestions = Math.min(
    progress.completedQuestions,
    progress.totalQuestions,
  );
  const completionPct =
    progress.totalQuestions > 0
      ? Math.min(100, Math.round((progress.completedQuestions / progress.totalQuestions) * 100))
      : 0;

  const accuracyPct =
    progress.completedQuestions > 0
      ? Math.round((progress.correctAnswers / progress.completedQuestions) * 100)
      : 0;

  const hasStarted = progress.completedQuestions > 0;
  const accuracyLabel = resolveAccuracyLabel(accuracyPct);

  return (
    <button
      onClick={locked ? undefined : () => onSelect(subject.id)}
      disabled={locked}
      className={[
        'group relative w-full overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-gray-200/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-slate-900 dark:ring-slate-800 dark:shadow-black/20 dark:focus:ring-offset-slate-950',
        locked
          ? 'cursor-not-allowed opacity-60 grayscale'
          : 'hover:-translate-y-1 hover:shadow-xl hover:ring-gray-300 dark:hover:ring-slate-700 dark:hover:shadow-slate-900/50',
      ].join(' ')}
      aria-label={locked ? `${subject.name} (bloqueado)` : `Ir a ${subject.name}`}
    >
      {/* Gradient top accent bar */}
      <div className={`h-1 w-full ${GRADIENT_BAR_MAP[subject.id]}`} />

      {/* Decorative watermark symbol */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 right-4 select-none font-black leading-none opacity-[0.045] dark:opacity-[0.07]"
        style={{ fontSize: '82px' }}
      >
        {DECORATIVE_SYMBOL_MAP[subject.id]}
      </span>

      <div className="p-5">
        {/* Icon + status badge */}
        <div className="mb-4 flex items-start justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${ICON_BG_MAP[subject.id]} transition-transform duration-200 group-hover:scale-110`}
          >
            <span className={`${subject.accentColor} ${DARK_ACCENT_CLASS[subject.id]}`} aria-hidden="true">
              {ICON_MAP[subject.iconKey]}
            </span>
          </div>

          {locked ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500 dark:bg-slate-800 dark:text-slate-400">
              <LockOutlinedIcon sx={{ fontSize: 12 }} />
              Bloqueado
            </span>
          ) : hasStarted ? (
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${accuracyLabel.className}`}>
              {accuracyLabel.text}
            </span>
          ) : (
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-400 dark:bg-slate-800 dark:text-slate-500">
              Sin iniciar
            </span>
          )}
        </div>

        {/* Title & description */}
        <h3 className="mb-2 text-base font-bold leading-snug text-gray-900 dark:text-slate-100">
          {subject.name}
        </h3>

        {/* Area tag */}
        <span
          className={`mb-3 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${AREA_TAG_MAP[subject.id].className}`}
        >
          {AREA_TAG_MAP[subject.id].label}
        </span>

        <p className="mb-5 line-clamp-1 text-sm leading-relaxed text-gray-400 dark:text-slate-500">
          {subject.description}
        </p>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-gray-400 dark:text-slate-500">
              {displayedCompletedQuestions} / {progress.totalQuestions} preguntas
            </span>
            <span className={`font-bold ${subject.accentColor} ${DARK_ACCENT_CLASS[subject.id]}`}>
              {completionPct}%
            </span>
          </div>
          <ProgressBar percentage={completionPct} colorClass={subject.progressColor} heightClass="h-2" />
        </div>
      </div>

      {/* Arrow — slides in on hover */}
      <div
        className={`absolute bottom-4 right-4 flex h-7 w-7 translate-y-2 items-center justify-center rounded-full opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 ${ICON_BG_MAP[subject.id]}`}
      >
        <ArrowForwardRoundedIcon
          sx={{ fontSize: 14 }}
          className={`${subject.accentColor} ${DARK_ACCENT_CLASS[subject.id]}`}
        />
      </div>
    </button>
  );
};
