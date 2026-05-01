interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  /** Color del arco activo en formato hex o clase que use stroke */
  strokeColor?: string;
}

/**
 * Indicador de progreso circular basado en SVG.
 * El porcentaje se limita al rango [0, 100] automáticamente.
 */
export const CircularProgress = ({
  percentage,
  size = 64,
  strokeWidth = 5,
  strokeColor = '#4f46e5',
}: CircularProgressProps) => {
  const clamped = Math.min(100, Math.max(0, percentage));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center flex-shrink-0"
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progreso: ${clamped}%`}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        {/* Pista base */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        {/* Arco de progreso */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
        />
      </svg>
      <span className="absolute text-xs font-bold text-gray-700">{clamped}%</span>
    </div>
  );
};
