import { useNavigate } from 'react-router-dom';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Navbar } from '../components/Navbar';
import { LevelMap } from '../components/LevelMap';
import { SubjectCard } from '../components/SubjectCard';
import { ProgressSidebar } from '../components/ProgressSidebar';
import { LeaderboardSidebar } from '../components/LeaderboardSidebar';
import { useUserProgress } from '../hooks/useUserProgress';
import { SUBJECTS } from '../mocks/data.mock';
import type { SubjectId } from '../types';

const formatCurrentDate = () =>
  new Intl.DateTimeFormat('es-CO', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());

export const HomePage = () => {
  const { userProgress, stats, getSubjectProgress, overallCompletionPct, overallAccuracyPct, isLoading, error } =
    useUserProgress();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-slate-950">
      <Navbar pageName="Inicio" streak={stats.streak} />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 space-y-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <LevelMap overallCompletionPct={overallCompletionPct} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          <section className="lg:col-span-2 space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-indigo-100/60 bg-gradient-to-br from-white to-indigo-50/50 p-6 shadow-sm dark:border-indigo-950/40 dark:from-slate-900 dark:to-indigo-950/20 dark:shadow-black/20">
              {/* Decorative blobs */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-indigo-100/40 dark:bg-indigo-900/20" />
              <div className="pointer-events-none absolute -bottom-12 right-28 h-28 w-28 rounded-full bg-violet-100/30 dark:bg-violet-900/10" />

              <div className="relative z-10 space-y-5">
                <div>
                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium capitalize text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300">
                    {formatCurrentDate()}
                  </span>
                  <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-slate-100">
                    Hola, {isLoading ? '\u2026' : userProgress.username}!
                  </h1>
                  <p className="mt-1 text-sm text-gray-400 dark:text-slate-500">
                    {error ?? '\u00bfQu\u00e9 \u00e1rea vas a practicar hoy?'}
                  </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white/70 dark:border-slate-800 dark:bg-slate-950/50">
                  <div className="flex flex-col divide-y divide-gray-100 sm:flex-row sm:divide-x sm:divide-y-0 dark:divide-slate-800">
                    <div className="flex flex-1 items-center gap-3 p-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950/60">
                        <QuizOutlinedIcon fontSize="small" className="text-indigo-500" />
                      </div>
                      <div>
                        <p className="text-xl font-extrabold leading-none text-gray-900 dark:text-slate-100">{stats.questionsToday}</p>
                        <p className="mt-0.5 text-xs text-gray-400 dark:text-slate-500">Preguntas hoy</p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-center gap-3 p-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-950/50">
                        <LocalFireDepartmentIcon fontSize="small" className="text-orange-500" />
                      </div>
                      <div>
                        <p className="text-xl font-extrabold leading-none text-gray-900 dark:text-slate-100">
                          {stats.streak} {stats.streak === 1 ? 'd\u00eda' : 'd\u00edas'}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-400 dark:text-slate-500">Racha activa</p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-center gap-3 p-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/50">
                        <TrendingUpIcon fontSize="small" className="text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xl font-extrabold leading-none text-gray-900 dark:text-slate-100">{overallAccuracyPct}%</p>
                        <p className="mt-0.5 text-xs text-gray-400 dark:text-slate-500">Tasa de aciertos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
              <section aria-labelledby="subjects-heading">
                <h2 id="subjects-heading" className="mb-4 text-xl font-bold text-gray-800 dark:text-slate-100">
                  Areas de evaluacion
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SUBJECTS.map((subject) => (
                    <SubjectCard
                      key={subject.id}
                      subject={subject}
                      progress={getSubjectProgress(subject.id as SubjectId)}
                      onSelect={(id) => navigate(`/quiz/${id}`)}
                      locked={subject.id === 'lectura-critica'}
                    />
                  ))}
                </div>
              </section>
            </div>
          </section>

          <div className="lg:col-span-1 space-y-4">
            <ProgressSidebar
              stats={stats}
              overallCompletionPct={overallCompletionPct}
              overallAccuracyPct={overallAccuracyPct}
            />
            <LeaderboardSidebar />
          </div>
        </div>
      </main>
    </div>
  );
};
