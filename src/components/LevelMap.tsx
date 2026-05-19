import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

type NodeStatus = 'completed' | 'active' | 'locked';

interface LevelNodeDef {
  id: number;
  title: string;
  requiredPct: number;
  icon: React.ReactNode;
}

const LEVEL_NODES: LevelNodeDef[] = [
  { id: 1, title: 'Explorador', requiredPct: 0, icon: <ExploreOutlinedIcon /> },
  { id: 2, title: 'Aprendiz', requiredPct: 20, icon: <SchoolOutlinedIcon /> },
  { id: 3, title: 'Practicante', requiredPct: 40, icon: <AutoStoriesOutlinedIcon /> },
  { id: 4, title: 'Avanzado', requiredPct: 60, icon: <EmojiEventsOutlinedIcon /> },
  { id: 5, title: 'Experto', requiredPct: 80, icon: <WorkspacePremiumOutlinedIcon /> },
  { id: 6, title: 'Maestro', requiredPct: 100, icon: <MilitaryTechOutlinedIcon /> },
];

interface LevelMapProps {
  overallCompletionPct: number;
}

export const LevelMap = ({ overallCompletionPct }: LevelMapProps) => {
  const getStatus = (index: number): NodeStatus => {
    const node = LEVEL_NODES[index];
    const nextNode = LEVEL_NODES[index + 1];

    if (overallCompletionPct < node.requiredPct) return 'locked';
    if (!nextNode || overallCompletionPct < nextNode.requiredPct) return 'active';

    return 'completed';
  };

  const activeIndex = LEVEL_NODES.findIndex((_, index) => getStatus(index) === 'active');
  const currentNode = activeIndex !== -1 ? LEVEL_NODES[activeIndex] : null;
  const nextNode = activeIndex !== -1 ? LEVEL_NODES[activeIndex + 1] : null;

  const segmentPct =
    currentNode && nextNode
      ? Math.min(
          100,
          Math.round(
            ((overallCompletionPct - currentNode.requiredPct) /
              (nextNode.requiredPct - currentNode.requiredPct)) *
              100,
          ),
        )
      : 100;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-800 dark:text-slate-100">
            Tu camino de aprendizaje
          </h3>
          <p className="mt-0.5 text-xs text-gray-400 dark:text-slate-500">
            Responde preguntas para desbloquear el siguiente nivel
          </p>
        </div>
        {nextNode && (
          <span className="whitespace-nowrap rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:border-indigo-950 dark:bg-indigo-950/30 dark:text-indigo-300">
            Siguiente: {nextNode.title}
          </span>
        )}
      </div>

      <div className="-mx-2 overflow-x-auto px-2 pb-1">
        <div className="flex min-w-max items-center">
          {LEVEL_NODES.map((node, index) => {
            const status = getStatus(index);
            const isLast = index === LEVEL_NODES.length - 1;

            const circleClass =
              status === 'completed'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-950/40'
                : status === 'active'
                  ? 'border-2 border-indigo-600 bg-white text-indigo-600 shadow-lg shadow-indigo-100 dark:bg-slate-900 dark:text-indigo-300 dark:shadow-indigo-950/30'
                  : 'bg-gray-100 text-gray-300 dark:bg-slate-800 dark:text-slate-600';

            const titleClass =
              status === 'active'
                ? 'font-bold text-indigo-600 dark:text-indigo-300'
                : status === 'completed'
                  ? 'font-semibold text-gray-600 dark:text-slate-300'
                  : 'font-medium text-gray-300 dark:text-slate-600';

            const lineClass =
              status === 'completed'
                ? 'bg-indigo-400'
                : 'bg-gray-200 dark:bg-slate-800';

            return (
              <div key={node.id} className="flex items-center">
                <div className="flex w-20 flex-col items-center">
                  <div className="relative flex items-center justify-center">
                    {status === 'active' && (
                      <span className="absolute h-14 w-14 rounded-full bg-indigo-400 opacity-20 animate-ping dark:bg-indigo-500/70" />
                    )}
                    <div
                      className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${circleClass}`}
                    >
                      {status === 'completed' && <CheckRoundedIcon fontSize="small" />}
                      {status === 'active' && node.icon}
                      {status === 'locked' && <LockOutlinedIcon fontSize="small" />}
                    </div>
                  </div>
                  <p className={`mt-2 text-center text-xs leading-tight ${titleClass}`}>
                    {node.title}
                  </p>
                  <p className="text-center text-xs text-gray-400 dark:text-slate-500">
                    {node.requiredPct}%
                  </p>
                </div>
                {!isLast && (
                  <div
                    className={`h-0.5 w-10 flex-shrink-0 rounded-full transition-all duration-500 ${lineClass}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {currentNode && nextNode && (
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 dark:border-indigo-950 dark:bg-indigo-950/30">
          <ArrowForwardRoundedIcon
            fontSize="small"
            className="flex-shrink-0 text-indigo-400 dark:text-indigo-300"
          />
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex justify-between text-xs">
              <span className="truncate font-medium text-gray-500 dark:text-slate-400">
                {currentNode.title} &rarr; {nextNode.title}
              </span>
              <span className="ml-2 flex-shrink-0 font-bold text-indigo-600 dark:text-indigo-300">
                {overallCompletionPct}% / {nextNode.requiredPct}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-indigo-200 dark:bg-indigo-950">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all duration-700 ease-out"
                style={{ width: `${segmentPct}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {!nextNode && (
        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center dark:border-emerald-950 dark:bg-emerald-950/30">
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            Has completado todos los niveles. Eres un Maestro Saber Pro.
          </p>
        </div>
      )}
    </div>
  );
};
