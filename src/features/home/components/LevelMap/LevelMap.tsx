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
  { id: 1, title: 'Explorador',   requiredPct: 0,   icon: <ExploreOutlinedIcon /> },
  { id: 2, title: 'Aprendiz',     requiredPct: 20,  icon: <SchoolOutlinedIcon /> },
  { id: 3, title: 'Practicante',  requiredPct: 40,  icon: <AutoStoriesOutlinedIcon /> },
  { id: 4, title: 'Avanzado',     requiredPct: 60,  icon: <EmojiEventsOutlinedIcon /> },
  { id: 5, title: 'Experto',      requiredPct: 80,  icon: <WorkspacePremiumOutlinedIcon /> },
  { id: 6, title: 'Maestro',      requiredPct: 100, icon: <MilitaryTechOutlinedIcon /> },
];

interface LevelMapProps {
  /** Porcentaje global de completitud (0-100) para calcular el nodo activo */
  overallCompletionPct: number;
}

/**
 * Mapa de progreso tipo videojuego.
 * Cada nodo representa un hito del camino; el estado se calcula dinámicamente.
 */
export const LevelMap = ({ overallCompletionPct }: LevelMapProps) => {
  const getStatus = (index: number): NodeStatus => {
    const node = LEVEL_NODES[index];
    const nextNode = LEVEL_NODES[index + 1];
    if (overallCompletionPct < node.requiredPct) return 'locked';
    if (!nextNode || overallCompletionPct < nextNode.requiredPct) return 'active';
    return 'completed';
  };

  const activeIndex = LEVEL_NODES.findIndex((_, i) => getStatus(i) === 'active');
  const currentNode = activeIndex !== -1 ? LEVEL_NODES[activeIndex] : null;
  const nextNode = activeIndex !== -1 ? LEVEL_NODES[activeIndex + 1] : null;

  const segmentPct =
    currentNode && nextNode
      ? Math.min(
          100,
          Math.round(
            ((overallCompletionPct - currentNode.requiredPct) /
              (nextNode.requiredPct - currentNode.requiredPct)) *
              100
          )
        )
      : 100;

  return (
    <div>
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-gray-800 text-base">Tu camino de aprendizaje</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Responde preguntas para desbloquear el siguiente nivel
          </p>
        </div>
        {nextNode && (
          <span className="text-xs text-indigo-600 font-semibold bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full whitespace-nowrap">
            Siguiente: {nextNode.title}
          </span>
        )}
      </div>

      {/* Mapa de nodos */}
      <div className="overflow-x-auto -mx-2 px-2 pb-1">
        <div className="flex items-center min-w-max">
          {LEVEL_NODES.map((node, index) => {
            const status = getStatus(index);
            const isLast = index === LEVEL_NODES.length - 1;

            const circleClass =
              status === 'completed'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                : status === 'active'
                ? 'bg-white border-2 border-indigo-600 text-indigo-600 shadow-lg shadow-indigo-100'
                : 'bg-gray-100 text-gray-300';

            const titleClass =
              status === 'active'
                ? 'text-indigo-600 font-bold'
                : status === 'completed'
                ? 'text-gray-600 font-semibold'
                : 'text-gray-300 font-medium';

            const lineClass =
              status === 'completed' ? 'bg-indigo-400' : 'bg-gray-200';

            return (
              <div key={node.id} className="flex items-center">
                {/* Nodo */}
                <div className="flex flex-col items-center w-20">
                  <div className="relative flex items-center justify-center">
                    {/* Anillo pulsante en el nodo activo */}
                    {status === 'active' && (
                      <span className="absolute w-14 h-14 rounded-full bg-indigo-400 animate-ping opacity-20" />
                    )}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${circleClass}`}>
                      {status === 'completed' && <CheckRoundedIcon fontSize="small" />}
                      {status === 'active' && node.icon}
                      {status === 'locked' && <LockOutlinedIcon fontSize="small" />}
                    </div>
                  </div>

                  <p className={`text-xs mt-2 text-center leading-tight ${titleClass}`}>
                    {node.title}
                  </p>
                  <p className="text-xs text-gray-400 text-center">{node.requiredPct}%</p>
                </div>

                {/* Línea conectora */}
                {!isLast && (
                  <div className={`h-0.5 w-10 flex-shrink-0 rounded-full transition-all duration-500 ${lineClass}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Barra de progreso hacia el siguiente hito */}
      {currentNode && nextNode && (
        <div className="mt-5 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 flex items-center gap-3">
          <ArrowForwardRoundedIcon fontSize="small" className="text-indigo-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-500 font-medium truncate">
                {currentNode.title} &rarr; {nextNode.title}
              </span>
              <span className="text-indigo-600 font-bold ml-2 flex-shrink-0">
                {overallCompletionPct}% / {nextNode.requiredPct}%
              </span>
            </div>
            <div className="w-full h-2 bg-indigo-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${segmentPct}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mensaje de completitud total */}
      {!nextNode && (
        <div className="mt-5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-center">
          <p className="text-emerald-700 font-semibold text-sm">
            Has completado todos los niveles. ¡Eres un Maestro Saber Pro!
          </p>
        </div>
      )}
    </div>
  );
};
