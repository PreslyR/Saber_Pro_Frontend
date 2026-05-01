import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface DailyStatsProps {
  username: string;
  streak: number;
  questionsToday: number;
  overallAccuracyPct: number;
}

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  iconBg: string;
  iconColor: string;
}

const StatCard = ({ icon, value, label, iconBg, iconColor }: StatCardProps) => (
  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex items-center gap-4 flex-1">
    <div className={`${iconBg} ${iconColor} rounded-xl p-3 flex-shrink-0`}>
      {icon}
    </div>
    <div>
      <p className="text-2xl font-extrabold text-gray-900 leading-none">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{label}</p>
    </div>
  </div>
);

/**
 * Widget de estadísticas del día que reemplaza el banner de bienvenida.
 * Muestra saludo + 3 métricas clave de la sesión actual del usuario.
 */
export const DailyStats = ({
  username,
  streak,
  questionsToday,
  overallAccuracyPct,
}: DailyStatsProps) => {
  return (
    <div className="space-y-4">
      {/* Saludo */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">¡Hola, {username}!</h1>
        <p className="text-gray-400 text-sm mt-1">¿Qué área vas a practicar hoy?</p>
      </div>

      {/* Métricas del día */}
      <div className="flex flex-col sm:flex-row gap-3">
        <StatCard
          icon={<QuizOutlinedIcon fontSize="medium" />}
          value={String(questionsToday)}
          label="Preguntas hoy"
          iconBg="bg-indigo-100"
          iconColor="text-indigo-600"
        />
        <StatCard
          icon={<LocalFireDepartmentIcon fontSize="medium" />}
          value={`${streak} días`}
          label="Racha activa"
          iconBg="bg-orange-100"
          iconColor="text-orange-500"
        />
        <StatCard
          icon={<TrendingUpIcon fontSize="medium" />}
          value={`${overallAccuracyPct}%`}
          label="Tasa de aciertos"
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
        />
      </div>
    </div>
  );
};
