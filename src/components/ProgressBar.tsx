interface ProgressBarProps {
  percentage: number;
  colorClass?: string;
  heightClass?: string;
  trackClassName?: string;
}

export const ProgressBar = ({
  percentage,
  colorClass = 'bg-indigo-500',
  heightClass = 'h-2',
  trackClassName = 'bg-gray-200 dark:bg-slate-700/80',
}: ProgressBarProps) => {
  const clamped = Math.min(100, Math.max(0, percentage));

  return (
    <div
      className={`w-full ${heightClass} ${trackClassName} rounded-full overflow-hidden`}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progreso: ${clamped}%`}
    >
      <div
        className={`h-full ${colorClass} rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
};
