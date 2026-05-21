import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useAppShell } from '../components/AppShell';
import { useSituation } from '../hooks/useSituation';
import { SUBJECTS } from '../mocks/data.mock';

const MIN_CHARS = 200;

export const WritingPage = () => {
  const navigate = useNavigate();
  const { openSidebar } = useAppShell();
  const subject = SUBJECTS.find((s) => s.id === 'comunicacion-escrita')!

  const {
    situation,
    isLoading,
    error,
    answer,
    setAnswer,
    isValidating,
    validationResult,
    validationError,
    validate,
    restart,
  } = useSituation();

  const canValidate = answer.trim().length >= MIN_CHARS && !isValidating && !validationResult;

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-gray-500 dark:bg-slate-950 dark:text-slate-400">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-teal-200 border-t-teal-500" />
        <p className="text-sm">Cargando situación...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-gray-500 dark:bg-slate-950 dark:text-slate-400">
        <p className="font-medium text-red-500">{error}</p>
        <button
          className="rounded-xl bg-teal-600 px-5 py-2 font-semibold text-white transition-colors hover:bg-teal-700"
          onClick={restart}
        >
          Reintentar
        </button>
        <button className="text-sm text-teal-600 underline" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <button
            onClick={() => navigate('/')}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            aria-label="Volver al inicio"
          >
            <ArrowBackRoundedIcon fontSize="small" />
          </button>

          <div className="flex flex-1 items-center gap-2">
            <EditNoteOutlinedIcon fontSize="small" className="text-teal-500" />
            <span className="font-semibold text-gray-800 dark:text-slate-200">{subject.name}</span>
          </div>

          <button
            onClick={openSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            aria-label="Abrir menú"
          >
            <MenuRoundedIcon fontSize="small" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-4 px-4 py-8">
        {/* Situation section */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-950/40">
              <ArticleOutlinedIcon sx={{ fontSize: 16 }} className="text-teal-500" />
            </div>
            <h2 className="font-semibold text-gray-700 dark:text-slate-300">Situación</h2>
          </div>

          <p className="leading-relaxed text-gray-700 dark:text-slate-300">{situation?.text}</p>

          {situation?.instruction && (
            <>
              <hr className="my-4 border-gray-100 dark:border-slate-800" />
              <p className="text-sm italic text-gray-500 dark:text-slate-400">
                {situation.instruction}
              </p>
            </>
          )}

          {situation?.criteria && situation.criteria.length > 0 && (
            <>
              <hr className="my-4 border-gray-100 dark:border-slate-800" />
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-slate-500">
                Criterios de evaluación
              </p>
              <ul className="space-y-1.5">
                {situation.criteria.map((criterion, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-slate-400">
                    <CheckRoundedIcon sx={{ fontSize: 14 }} className="mt-0.5 flex-shrink-0 text-teal-400" />
                    {criterion}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        {/* Answer section */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-950/40">
              <EditNoteOutlinedIcon sx={{ fontSize: 16 }} className="text-teal-500" />
            </div>
            <h2 className="font-semibold text-gray-700 dark:text-slate-300">Tu respuesta</h2>
          </div>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={!!validationResult || isValidating}
            rows={7}
            placeholder="Escribe tu respuesta aquí..."
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-relaxed text-gray-800 outline-none transition-all placeholder:text-gray-300 focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-200/60 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-600 dark:focus:border-teal-600 dark:focus:bg-slate-900 dark:focus:ring-teal-900/30"
          />

          <div className="mt-1.5 flex items-center justify-between text-xs">
            <span className="text-gray-400 dark:text-slate-500">Mínimo {MIN_CHARS} caracteres</span>
            <span
              className={
                answer.trim().length >= MIN_CHARS
                  ? 'font-medium text-teal-500'
                  : 'text-gray-400 dark:text-slate-500'
              }
            >
              {answer.trim().length} / {MIN_CHARS}
            </span>
          </div>

          {/* Validation result */}
          {validationResult && (
            <div className="mt-4 rounded-xl border border-teal-200 bg-teal-50 p-4 dark:border-teal-900/50 dark:bg-teal-950/30">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircleRoundedIcon sx={{ fontSize: 18 }} className="text-teal-500" />
                <span className="text-sm font-semibold text-teal-700 dark:text-teal-300">
                  Evaluación
                </span>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700 dark:text-slate-300">
                {validationResult.evaluacion}
              </p>
            </div>
          )}

          {validationError && (
            <p className="mt-3 text-sm text-red-500 dark:text-red-400">{validationError}</p>
          )}

          {/* Actions */}
          <div className="mt-5 flex items-center justify-between">
            {validationResult ? (
              <button
                onClick={restart}
                className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <RefreshRoundedIcon sx={{ fontSize: 16 }} />
                Nueva situación
              </button>
            ) : (
              <span />
            )}

            <button
              onClick={validate}
              disabled={!canValidate}
              className="flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-slate-900"
            >
              {isValidating ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Validando...
                </>
              ) : (
                'Validar'
              )}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
