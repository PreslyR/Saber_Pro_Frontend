import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import type { Subject, SubjectIconKey, SubjectProgress } from '../types';
import { ProgressBar } from './ProgressBar';

const ICON_MAP: Record<SubjectIconKey, React.ReactNode> = {
  calculate: <CalculateOutlinedIcon fontSize="large" />,
  'menu-book': <MenuBookOutlinedIcon fontSize="large" />,
  language: <LanguageIcon fontSize="large" />,
  science: <ScienceOutlinedIcon fontSize="large" />,
  'account-balance': <AccountBalanceOutlinedIcon fontSize="large" />,
  'edit-note': <EditNoteOutlinedIcon fontSize="large" />,
};

interface SubjectCardProps {
  subject: Subject;
  progress: SubjectProgress;
  onSelect: (subjectId: string) => void;
}

const DARK_CARD_CLASS: Record<Subject['id'], string> = {
  'razonamiento-cuantitativo': 'dark:bg-blue-950/35 dark:hover:bg-blue-900/45 dark:border-blue-900/60',
  'lectura-critica': 'dark:bg-purple-950/35 dark:hover:bg-purple-900/45 dark:border-purple-900/60',
  ingles: 'dark:bg-emerald-950/35 dark:hover:bg-emerald-900/45 dark:border-emerald-900/60',
  'competencias-ciudadanas': 'dark:bg-rose-950/35 dark:hover:bg-rose-900/45 dark:border-rose-900/60',
  'comunicacion-escrita': 'dark:bg-teal-950/35 dark:hover:bg-teal-900/45 dark:border-teal-900/60',
};

const DARK_ACCENT_CLASS: Record<Subject['id'], string> = {
  'razonamiento-cuantitativo': 'dark:text-blue-300',
  'lectura-critica': 'dark:text-purple-300',
  ingles: 'dark:text-emerald-300',
  'competencias-ciudadanas': 'dark:text-rose-300',
  'comunicacion-escrita': 'dark:text-teal-300',
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

export const SubjectCard = ({ subject, progress, onSelect }: SubjectCardProps) => {
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
      onClick={() => onSelect(subject.id)}
      className={`${subject.bgColor} ${DARK_CARD_CLASS[subject.id]} w-full rounded-2xl border border-transparent p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950`}
      aria-label={`Ir a ${subject.name}`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className={`${subject.accentColor} ${DARK_ACCENT_CLASS[subject.id]}`} aria-hidden="true">
          {ICON_MAP[subject.iconKey]}
        </span>
        {hasStarted ? (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${accuracyLabel.className}`}>
            {accuracyLabel.text}
          </span>
        ) : (
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500 dark:bg-slate-800 dark:text-slate-300">
            Sin iniciar
          </span>
        )}
      </div>

      <h3 className="mb-1 text-base font-bold text-gray-900 dark:text-slate-100">{subject.name}</h3>
      <p className="mb-4 line-clamp-2 text-sm text-gray-500 dark:text-slate-400">{subject.description}</p>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-gray-400 dark:text-slate-500">
          <span>
            {displayedCompletedQuestions} / {progress.totalQuestions} preguntas
          </span>
          <span className={`font-semibold ${subject.accentColor} ${DARK_ACCENT_CLASS[subject.id]}`}>{completionPct}%</span>
        </div>
        <ProgressBar percentage={completionPct} colorClass={subject.progressColor} heightClass="h-2" />
      </div>
    </button>
  );
};
