import { DailyStats } from './components/DailyStats/DailyStats';
import { LevelMap } from './components/LevelMap/LevelMap';
import { SubjectGrid } from './components/SubjectGrid/SubjectGrid';
import { ProgressSidebar } from './components/ProgressSidebar/ProgressSidebar';
import { useUserProgress } from './hooks/useUserProgress';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { SUBJECTS } from '../../mocks/subjects.mock';
import type { SubjectId } from '../../types/subject.types';

/**
 * Pantalla principal de la aplicación.
 * Layout de dos columnas: izquierda (asignaturas) y derecha (panel de progreso).
 * La lógica de estado está completamente delegada en useUserProgress.
 */
export const HomePage = () => {
  const { userProgress, stats, getSubjectProgress, overallCompletionPct, overallAccuracyPct } =
    useUserProgress();

  const handleSelectSubject = (subjectId: string) => {
    // TODO: Conectar con React Router en la siguiente iteración
    // navigate(`/quiz/${subjectId}`)
    console.log(`Materia seleccionada: ${subjectId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar pageName="Inicio" streak={stats.streak} />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 space-y-4">

        {/* ── Mapa de niveles (ancho completo) ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <LevelMap overallCompletionPct={overallCompletionPct} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">

          {/* ── Columna izquierda: estadísticas del día + materias ── */}
          <section className="lg:col-span-2 space-y-4">

            {/* Tarjeta de metas del día */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <DailyStats
                username={userProgress.username}
                streak={stats.streak}
                questionsToday={stats.questionsToday}
                overallAccuracyPct={overallAccuracyPct}
              />
            </div>

            {/* Tarjeta de áreas de evaluación */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <SubjectGrid
                subjects={SUBJECTS}
                getProgress={(id) => getSubjectProgress(id as SubjectId)}
                onSelectSubject={handleSelectSubject}
              />
            </div>

          </section>

          {/* ── Columna derecha: panel de progreso ── */}
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
