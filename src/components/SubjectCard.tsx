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

const resolveAccuracyLabel = (accuracyPct: number): { text: string; className: string } => {
  if (accuracyPct >= 70) return { text: 'Bueno', className: 'bg-emerald-100 text-emerald-700' };
  if (accuracyPct >= 40) return { text: 'Regular', className: 'bg-yellow-100 text-yellow-700' };
  return { text: 'Por mejorar', className: 'bg-red-100 text-red-700' };
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
      className={`${subject.bgColor} rounded-2xl p-5 text-left w-full transition-all duration-200 border border-transparent hover:shadow-md hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      aria-label={`Ir a ${subject.name}`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className={subject.accentColor} aria-hidden="true">
          {ICON_MAP[subject.iconKey]}
        </span>
        {hasStarted ? (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${accuracyLabel.className}`}>
            {accuracyLabel.text}
          </span>
        ) : (
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-500">
            Sin iniciar
          </span>
        )}
      </div>

      <h3 className="font-bold text-gray-900 text-base mb-1">{subject.name}</h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{subject.description}</p>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-gray-400">
          <span>
            {displayedCompletedQuestions} / {progress.totalQuestions} preguntas
          </span>
          <span className={`font-semibold ${subject.accentColor}`}>{completionPct}%</span>
        </div>
        <ProgressBar percentage={completionPct} colorClass={subject.progressColor} heightClass="h-2" />
      </div>
    </button>
  );
};
