import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

interface AnswerFeedbackProps {
  isCorrect: boolean;
  explanation: string;
}

export const AnswerFeedback = ({
  isCorrect,
  explanation,
}: AnswerFeedbackProps) => {
  return (
    <div
      className={`flex gap-3 rounded-2xl border p-4 ${
        isCorrect
          ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-950 dark:bg-emerald-950/30'
          : 'border-red-200 bg-red-50 dark:border-red-950 dark:bg-red-950/30'
      }`}
    >
      <div className="mt-0.5 flex-shrink-0">
        {isCorrect ? (
          <CheckCircleOutlineRoundedIcon className="text-emerald-500 dark:text-emerald-300" />
        ) : (
          <HighlightOffRoundedIcon className="text-red-400 dark:text-red-300" />
        )}
      </div>
      <div>
        <p
          className={`text-sm font-semibold ${
            isCorrect
              ? 'text-emerald-700 dark:text-emerald-300'
              : 'text-red-600 dark:text-red-300'
          }`}
        >
          {isCorrect ? 'Correcto' : 'Respuesta incorrecta'}
        </p>
        <div className="mt-2 flex items-start gap-1.5">
          <LightbulbOutlinedIcon
            fontSize="small"
            className="mt-0.5 flex-shrink-0 text-amber-400"
          />
          <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-300">
            {explanation}
          </p>
        </div>
      </div>
    </div>
  );
};
