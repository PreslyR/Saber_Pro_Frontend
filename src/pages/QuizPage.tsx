import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useQuiz } from '../hooks/useQuiz';
import { AnswerOptions } from '../components/AnswerOptions';
import { AnswerFeedback } from '../components/AnswerFeedback';
import { useAppShell } from '../components/AppShell';
import { QuizResults } from '../components/QuizResults';
import { ProgressBar } from '../components/ProgressBar';
import { SUBJECTS } from '../mocks/data.mock';
import type { OptionId, SubjectId } from '../types';

export const QuizPage = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { openSidebar } = useAppShell();

  const subject = SUBJECTS.find((item) => item.id === subjectId);

  const {
    session,
    selectedOptionId,
    hasAnswered,
    isLastQuestion,
    correctCount,
    isLoading,
    error,
    isSavingResult,
    saveError,
    selectOption,
    confirmAnswer,
    nextQuestion,
    restartQuiz,
    retrySaveResult,
  } = useQuiz((subjectId as SubjectId) ?? 'lectura-critica');

  if (!subject) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500 dark:bg-slate-950 dark:text-slate-400">
        Materia no encontrada.
        <button className="text-indigo-600 underline ml-1" onClick={() => navigate('/')}>
          Volver
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-gray-500 dark:bg-slate-950 dark:text-slate-400">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-gray-500 dark:bg-slate-950 dark:text-slate-400">
        <p className="text-red-500 font-medium">{error}</p>
        <button
          className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          onClick={restartQuiz}
        >
          Reintentar
        </button>
        <button className="text-indigo-600 underline text-sm" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </div>
    );
  }

  if (session.isFinished) {
    return (
      <QuizResults
        subjectName={subject.name}
        correctCount={correctCount}
        totalQuestions={session.questions.length}
        onRestart={restartQuiz}
        onGoHome={() => navigate('/')}
        isSavingResult={isSavingResult}
        saveError={saveError}
        onRetrySave={retrySaveResult}
      />
    );
  }

  const currentQuestion = session.questions[session.currentIndex];
  const lastAnswer = session.answers[session.answers.length - 1];
  const progressPct =
    session.questions.length > 0
      ? Math.round((session.currentIndex / session.questions.length) * 100)
      : 0;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-slate-950">
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <button
              type="button"
              onClick={openSidebar}
              aria-label="Abrir menu lateral"
              className="flex-shrink-0 text-gray-400 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300"
            >
              <MenuRoundedIcon />
            </button>
            <button
              onClick={() => navigate('/')}
              aria-label="Volver al inicio"
              className="flex-shrink-0 text-gray-400 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300"
            >
              <ArrowBackRoundedIcon />
            </button>
            <div className="flex-1 min-w-0">
              <p className="truncate font-semibold text-gray-800 dark:text-slate-100">{subject.name}</p>
              <p className="text-xs text-gray-400 dark:text-slate-500">
                Pregunta {session.currentIndex + 1} de {session.questions.length}
              </p>
            </div>
            <span className="text-sm font-bold text-indigo-600 flex-shrink-0">{progressPct}%</span>
          </div>
          <ProgressBar percentage={progressPct} colorClass="bg-indigo-500" heightClass="h-1.5" />
        </div>
      </div>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-400 dark:text-indigo-300">
            Pregunta {session.currentIndex + 1}
          </p>
          <p className="text-lg font-medium leading-relaxed text-gray-900 dark:text-slate-100">
            {currentQuestion.statement}
          </p>
        </div>

        <AnswerOptions
          options={currentQuestion.options}
          selectedOptionId={selectedOptionId}
          correctOptionId={currentQuestion.correctOptionId}
          hasAnswered={hasAnswered}
          onSelect={(id) => selectOption(id as OptionId)}
        />

        {hasAnswered && lastAnswer && (
          <AnswerFeedback isCorrect={lastAnswer.isCorrect} explanation={currentQuestion.explanation} />
        )}

        <div className="flex justify-end pt-2">
          {!hasAnswered ? (
            <button
              onClick={confirmAnswer}
              disabled={!selectedOptionId}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Confirmar respuesta
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Ver resultados' : 'Siguiente pregunta ->'}
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
