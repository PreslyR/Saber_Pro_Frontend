import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

interface QuizResultsProps {
  subjectName: string;
  correctCount: number;
  totalQuestions: number;
  onRestart: () => void;
  onGoHome: () => void;
  isSavingResult?: boolean;
  saveError?: string | null;
  onRetrySave?: () => void;
}

const getPerformanceLabel = (pct: number): { text: string; color: string } => {
  if (pct >= 80) return { text: 'Excelente resultado', color: 'text-emerald-600' };
  if (pct >= 60) return { text: 'Buen trabajo', color: 'text-indigo-600' };
  if (pct >= 40) return { text: 'Puedes mejorar', color: 'text-amber-500' };
  return { text: 'Sigue practicando', color: 'text-red-500' };
};

export const QuizResults = ({
  subjectName,
  correctCount,
  totalQuestions,
  onRestart,
  onGoHome,
  isSavingResult = false,
  saveError = null,
  onRetrySave,
}: QuizResultsProps) => {
  const pct = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const { text: performanceText, color: performanceColor } = getPerformanceLabel(pct);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950/40">
          <EmojiEventsOutlinedIcon className="text-indigo-500" style={{ fontSize: 32 }} />
        </div>

        <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-slate-100">Quiz finalizado</h2>
        <p className="mb-6 text-sm text-gray-400 dark:text-slate-500">{subjectName}</p>

        <div className="mb-4 rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-slate-800 dark:bg-slate-950/60">
          <p className="text-6xl font-extrabold text-indigo-600 mb-1">{pct}%</p>
          <p className={`text-sm font-semibold ${performanceColor}`}>{performanceText}</p>
          <p className="mt-2 text-xs text-gray-400 dark:text-slate-500">
            {correctCount} de {totalQuestions} respuestas correctas
          </p>
        </div>

        {isSavingResult && (
          <p className="mb-4 text-sm text-gray-500 dark:text-slate-400">Guardando resultado...</p>
        )}

        {saveError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-left dark:border-red-950 dark:bg-red-950/30">
            <p className="text-sm text-red-600 dark:text-red-300">{saveError}</p>
            {onRetrySave && (
              <button
                onClick={onRetrySave}
                className="mt-3 text-sm font-semibold text-red-600 hover:text-red-700 dark:text-red-300 dark:hover:text-red-200"
              >
                Reintentar guardado
              </button>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onGoHome}
            disabled={isSavingResult}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 font-semibold text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <HomeRoundedIcon fontSize="small" />
            Inicio
          </button>
          <button
            onClick={onRestart}
            disabled={isSavingResult}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300 dark:disabled:bg-indigo-900"
          >
            <ReplayRoundedIcon fontSize="small" />
            Reintentar
          </button>
        </div>
      </div>
    </div>
  );
};
