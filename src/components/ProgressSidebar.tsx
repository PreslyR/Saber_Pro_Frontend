import StarRoundedIcon from '@mui/icons-material/StarRounded';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import type { UserStats } from '../types';
import { CircularProgress } from './CircularProgress';
import { ProgressBar } from './ProgressBar';

interface ProgressSidebarProps {
  stats: UserStats;
  overallCompletionPct: number;
  overallAccuracyPct: number;
}

export const ProgressSidebar = ({ stats, overallCompletionPct, overallAccuracyPct }: ProgressSidebarProps) => {
  const dailyPct =
    stats.dailyGoalTarget > 0
      ? Math.round((stats.dailyGoalCompleted / stats.dailyGoalTarget) * 100)
      : 0;

  const xpPct = Math.round((stats.xp / stats.xpToNextLevel) * 100);

  return (
    <aside className="flex flex-col gap-4">
      {/* Meta diaria */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        <h3 className="mb-4 font-semibold text-gray-800 dark:text-slate-100">Meta diaria</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-800 dark:text-slate-100">
              {stats.dailyGoalCompleted}
              <span className="text-base font-normal text-gray-400 dark:text-slate-500"> / {stats.dailyGoalTarget}</span>
            </p>
            <p className="mt-0.5 text-xs text-gray-400 dark:text-slate-500">Sesiones hoy</p>
          </div>
          <CircularProgress percentage={dailyPct} size={64} strokeWidth={6} />
        </div>
      </div>

      {/* Nivel y XP */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <StarRoundedIcon fontSize="small" className="text-yellow-400" />
            <span className="font-semibold text-gray-800 dark:text-slate-100">Nivel {stats.level}</span>
          </div>
          <span className="text-sm text-gray-400 dark:text-slate-500">{stats.xp} / {stats.xpToNextLevel} XP</span>
        </div>
        <ProgressBar percentage={xpPct} colorClass="bg-indigo-600" heightClass="h-3" />
      </div>

      {/* Objetivo */}
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5 dark:border-indigo-950 dark:bg-indigo-950/30">
        <div className="flex items-center gap-2 mb-3">
          <TrackChangesIcon fontSize="small" className="text-indigo-500" />
          <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Tu objetivo</span>
        </div>
        <h4 className="mb-1 font-bold text-gray-800 dark:text-slate-100">{stats.objective.name}</h4>
        <p className="text-sm text-gray-500 dark:text-slate-400">{stats.objective.description}</p>
      </div>

      {/* Progreso global */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        <h3 className="mb-4 font-semibold text-gray-800 dark:text-slate-100">Progreso general</h3>
        <div className="space-y-1.5 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-slate-400">Preguntas completadas</span>
            <span className="font-bold text-indigo-600">{overallCompletionPct}%</span>
          </div>
          <ProgressBar percentage={overallCompletionPct} colorClass="bg-indigo-500" heightClass="h-2.5" />
        </div>
        <div className="flex items-center justify-between rounded-xl bg-indigo-50 px-4 py-3 dark:bg-indigo-950/30">
          <span className="text-sm text-gray-500 dark:text-slate-400">Tasa de aciertos</span>
          <span className="text-3xl font-extrabold text-indigo-600">{overallAccuracyPct}%</span>
        </div>
      </div>
    </aside>
  );
};
