import { useNavigate } from 'react-router-dom';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Navbar } from '../components/Navbar';
import { LevelMap } from '../components/LevelMap';
import { SubjectCard } from '../components/SubjectCard';
import { ProgressSidebar } from '../components/ProgressSidebar';
import { useUserProgress } from '../hooks/useUserProgress';
import { SUBJECTS } from '../mocks/data.mock';
import type { SubjectId } from '../types';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  iconBg: string;
  iconColor: string;
}

const StatCard = ({ icon, value, label, iconBg, iconColor }: StatCardProps) => (
  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex items-center gap-4 flex-1">
    <div className={`${iconBg} ${iconColor} rounded-xl p-3 flex-shrink-0`}>{icon}</div>
    <div>
      <p className="text-2xl font-extrabold text-gray-900 leading-none">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{label}</p>
    </div>
  </div>
);

export const HomePage = () => {
  const { userProgress, stats, getSubjectProgress, overallCompletionPct, overallAccuracyPct, isLoading, error } =
    useUserProgress();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar pageName="Inicio" streak={stats.streak} />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 space-y-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <LevelMap overallCompletionPct={overallCompletionPct} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          <section className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Hola, {isLoading ? '...' : userProgress.username}
                  </h1>
                  <p className="text-gray-400 text-sm mt-1">
                    {error ?? 'Que area vas a practicar hoy?'}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <StatCard
                    icon={<QuizOutlinedIcon fontSize="medium" />}
                    value={String(stats.questionsToday)}
                    label="Preguntas hoy"
                    iconBg="bg-indigo-100"
                    iconColor="text-indigo-600"
                  />
                  <StatCard
                    icon={<LocalFireDepartmentIcon fontSize="medium" />}
                    value={`${stats.streak} dias`}
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
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <section aria-labelledby="subjects-heading">
                <h2 id="subjects-heading" className="text-xl font-bold text-gray-800 mb-4">
                  Areas de evaluacion
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SUBJECTS.map((subject) => (
                    <SubjectCard
                      key={subject.id}
                      subject={subject}
                      progress={getSubjectProgress(subject.id as SubjectId)}
                      onSelect={(id) => navigate(`/quiz/${id}`)}
                    />
                  ))}
                </div>
              </section>
            </div>
          </section>

          <div className="lg:col-span-1">
            <ProgressSidebar
              stats={stats}
              overallCompletionPct={overallCompletionPct}
              overallAccuracyPct={overallAccuracyPct}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
