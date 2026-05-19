import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import type { OptionId, QuizOption } from '../types';

interface AnswerOptionsProps {
  options: QuizOption[];
  selectedOptionId: OptionId | null;
  correctOptionId: OptionId;
  hasAnswered: boolean;
  onSelect: (id: OptionId) => void;
}

const getOptionStyle = (
  optionId: OptionId,
  selectedOptionId: OptionId | null,
  correctOptionId: OptionId,
  hasAnswered: boolean
): string => {
  const base =
    'w-full flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 dark:focus:ring-offset-slate-950';

  if (!hasAnswered) {
    return selectedOptionId === optionId
      ? `${base} border-indigo-500 bg-indigo-50 font-medium text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-200`
      : `${base} cursor-pointer border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/20`;
  }

  if (optionId === correctOptionId) {
    return `${base} border-emerald-500 bg-emerald-50 font-semibold text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200`;
  }
  if (optionId === selectedOptionId) {
    return `${base} border-red-400 bg-red-50 font-medium text-red-700 dark:bg-red-950/30 dark:text-red-200`;
  }
  return `${base} border-gray-200 bg-gray-50 text-gray-400 opacity-60 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-500`;
};

const OptionIcon = ({
  optionId,
  selectedOptionId,
  correctOptionId,
  hasAnswered,
}: {
  optionId: OptionId;
  selectedOptionId: OptionId | null;
  correctOptionId: OptionId;
  hasAnswered: boolean;
}) => {
  if (!hasAnswered) {
    return (
      <RadioButtonUncheckedRoundedIcon
        fontSize="small"
        className={selectedOptionId === optionId ? 'text-indigo-500 dark:text-indigo-300' : 'text-gray-300 dark:text-slate-600'}
      />
    );
  }
  if (optionId === correctOptionId) return <CheckCircleRoundedIcon fontSize="small" className="text-emerald-500 dark:text-emerald-300" />;
  if (optionId === selectedOptionId) return <CancelRoundedIcon fontSize="small" className="text-red-400 dark:text-red-300" />;
  return <RadioButtonUncheckedRoundedIcon fontSize="small" className="text-gray-300 dark:text-slate-600" />;
};

export const AnswerOptions = ({ options, selectedOptionId, correctOptionId, hasAnswered, onSelect }: AnswerOptionsProps) => {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <button
          key={option.id}
          disabled={hasAnswered}
          onClick={() => onSelect(option.id)}
          className={getOptionStyle(option.id, selectedOptionId, correctOptionId, hasAnswered)}
          aria-pressed={selectedOptionId === option.id}
        >
          <OptionIcon
            optionId={option.id}
            selectedOptionId={selectedOptionId}
            correctOptionId={correctOptionId}
            hasAnswered={hasAnswered}
          />
          <span className="text-sm leading-snug">
            <span className="font-bold mr-2">{option.id}.</span>
            {option.text}
          </span>
        </button>
      ))}
    </div>
  );
};
