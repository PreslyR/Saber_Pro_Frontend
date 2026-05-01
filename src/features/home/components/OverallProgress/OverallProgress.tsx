import { ProgressBar } from '../../../../components/ui/ProgressBar/ProgressBar';

interface OverallProgressProps {
  /** Porcentaje de preguntas completadas (0-100) */
  completionPct: number;
  /** Porcentaje de respuestas correctas (0-100) */
  accuracyPct: number;
}

/**
 * Tarjeta que muestra el resumen global del progreso del usuario:
 * avance de completitud y tasa de aciertos.
 */
export const OverallProgress = ({ completionPct, accuracyPct }: OverallProgressProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-5">Progreso general</h2>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Barra de completitud */}
        <div className="flex-1 w-full">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Preguntas completadas</span>
            <span className="text-sm font-bold text-indigo-600">{completionPct}%</span>
          </div>
          <ProgressBar percentage={completionPct} colorClass="bg-indigo-500" heightClass="h-3" />
        </div>

        {/* Métrica de aciertos */}
        <div className="flex items-center gap-3 sm:border-l sm:border-gray-100 sm:pl-6">
          <div className="text-center">
            <p className="text-4xl font-extrabold text-indigo-600">{accuracyPct}%</p>
            <p className="text-xs text-gray-400 mt-0.5">Tasa de aciertos</p>
          </div>
        </div>
      </div>
    </div>
  );
};
