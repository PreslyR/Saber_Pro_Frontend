import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import type { LeaderboardEntry } from '../types';
import { useLeaderboard } from '../hooks/useLeaderboard';

const MEDAL_STYLES = [
  'bg-yellow-400 text-yellow-900 shadow-sm shadow-yellow-200 dark:shadow-yellow-900/30',
  'bg-slate-300 text-slate-700 shadow-sm shadow-slate-200 dark:bg-slate-500 dark:text-slate-100 dark:shadow-slate-900/30',
  'bg-amber-600 text-amber-100 shadow-sm shadow-amber-200 dark:shadow-amber-900/30',
] as const;

const RankBadge = ({ rank }: { rank: number }) => {
  if (rank <= 3) {
    return (
      <span
        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${MEDAL_STYLES[rank - 1]}`}
      >
        {rank}
      </span>
    );
  }

  return (
    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500 dark:bg-slate-800 dark:text-slate-400">
      {rank}
    </span>
  );
};

const EntryRow = ({ entry }: { entry: LeaderboardEntry }) => (
  <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-gray-50 dark:hover:bg-slate-800/50">
    <RankBadge rank={entry.rank} />
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-semibold text-gray-800 dark:text-slate-100">
        {entry.username}
      </p>
      <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-400 dark:text-slate-500">
        <span className="flex items-center gap-0.5">
          <StarRoundedIcon style={{ fontSize: 12 }} className="text-yellow-400" />
          {entry.xp} XP
        </span>
        <span className="flex items-center gap-0.5">
          <LocalFireDepartmentIcon style={{ fontSize: 12 }} className="text-orange-400" />
          {entry.streak}
        </span>
      </div>
    </div>
    <span className="flex-shrink-0 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300">
      Nv.{entry.level}
    </span>
  </div>
);

const LeaderboardSkeleton = () => (
  <div className="space-y-2">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2.5">
        <div className="h-7 w-7 animate-pulse rounded-full bg-gray-200 dark:bg-slate-800" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-slate-800" />
          <div className="h-2.5 w-16 animate-pulse rounded bg-gray-200 dark:bg-slate-800" />
        </div>
        <div className="h-5 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-slate-800" />
      </div>
    ))}
  </div>
);

export const LeaderboardSidebar = () => {
  const { entries, isLoading, error } = useLeaderboard();

  return (
    <aside className="sticky top-24 rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
      <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-4 dark:border-slate-800">
        <EmojiEventsRoundedIcon fontSize="small" className="text-yellow-500" />
        <h3 className="font-semibold text-gray-800 dark:text-slate-100">Ranking</h3>
      </div>

      <div className="p-3">
        {isLoading && <LeaderboardSkeleton />}

        {!isLoading && (error || entries.length === 0) && (
          <p className="py-4 text-center text-sm text-gray-400 dark:text-slate-500">
            Sin datos disponibles
          </p>
        )}

        {!isLoading && entries.length > 0 && (
          <div className="space-y-1">
            {entries.map((entry) => (
              <EntryRow key={entry.userId} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
