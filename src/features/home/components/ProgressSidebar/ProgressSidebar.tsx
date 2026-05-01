import StarRoundedIcon from '@mui/icons-material/StarRounded';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import type { UserStats } from '../../../../types/stats.types';
import { CircularProgress } from '../../../../components/ui/CircularProgress/CircularProgress';
import { ProgressBar } from '../../../../components/ui/ProgressBar/ProgressBar';

interface ProgressSidebarProps {
  stats: UserStats;
  overallCompletionPct: number;
  overallAccuracyPct: number;
}

/**
 * Panel lateral derecho con todas las métricas del usuario:
 * meta diaria, nivel/XP, objetivo y progreso general.
 */
export const ProgressSidebar = ({
  stats,
  overallCompletionPct,
  overallAccuracyPct,
}: ProgressSidebarProps) => {
  const dailyPct =
    stats.dailyGoalTarget > 0
      ? Math.round((stats.dailyGoalCompleted / stats.dailyGoalTarget) * 100)
      : 0;

  const xpPct = Math.round((stats.xp / stats.xpToNextLevel) * 100);

  return (
    <aside className="flex flex-col gap-4">
      {/* ── Meta diaria ── */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Meta diaria</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {stats.dailyGoalCompleted}
              <span className="text-gray-400 font-normal text-base">
                {' '}/ {stats.dailyGoalTarget}
              </span>
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Sesiones hoy</p>
          </div>
          <CircularProgress percentage={dailyPct} size={64} strokeWidth={6} />
        </div>
      </div>

      {/* ── Nivel y XP ── */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <StarRoundedIcon fontSize="small" className="text-yellow-400" />
            <span className="font-semibold text-gray-800">Nivel {stats.level}</span>
          </div>
          <span className="text-sm text-gray-400">
            {stats.xp} / {stats.xpToNextLevel} XP
          </span>
        </div>
        <ProgressBar percentage={xpPct} colorClass="bg-indigo-600" heightClass="h-3" />
      </div>

      {/* ── Objetivo ── */}
      <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
        <div className="flex items-center gap-2 mb-3">
          <TrackChangesIcon fontSize="small" className="text-indigo-500" />
          <span className="font-semibold text-indigo-700 text-sm">Tu objetivo</span>
        </div>
        <h4 className="font-bold text-gray-800 mb-1">{stats.objective.name}</h4>
        <p className="text-sm text-gray-500 mb-3">{stats.objective.description}</p>
        
      </div>

      {/* ── Progreso global ── */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Progreso general</h3>

        <div className="space-y-1.5 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Preguntas completadas</span>
            <span className="font-bold text-indigo-600">{overallCompletionPct}%</span>
          </div>
          <ProgressBar percentage={overallCompletionPct} colorClass="bg-indigo-500" heightClass="h-2.5" />
        </div>

        <div className="flex items-center justify-between bg-indigo-50 rounded-xl px-4 py-3">
          <span className="text-sm text-gray-500">Tasa de aciertos</span>
          <span className="text-3xl font-extrabold text-indigo-600">{overallAccuracyPct}%</span>
        </div>
      </div>
    </aside>
  );
};
