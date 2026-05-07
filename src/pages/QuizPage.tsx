import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useQuiz } from '../hooks/useQuiz';
import { AnswerOptions } from '../components/AnswerOptions';
import { AnswerFeedback } from '../components/AnswerFeedback';
import { QuizResults } from '../components/QuizResults';
import { ProgressBar } from '../components/ProgressBar';
import { SUBJECTS } from '../mocks/data.mock';
import type { SubjectId, OptionId } from '../types';

export const QuizPage = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();

  const subject = SUBJECTS.find((s) => s.id === subjectId);

  const { session, selectedOptionId, hasAnswered, isLastQuestion, correctCount, isLoading, error, selectOption, confirmAnswer, nextQuestion, restartQuiz } =
    useQuiz((subjectId as SubjectId) ?? 'lectura-critica');

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Materia no encontrada.{' '}
        <button className="text-indigo-600 underline ml-1" onClick={() => navigate('/')}>
          Volver
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-500">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-500">
        <p className="text-red-500 font-medium">{error}</p>
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition-colors" onClick={restartQuiz}>
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Cabecera del quiz */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <button
              onClick={() => navigate('/')}
              aria-label="Volver al inicio"
              className="text-gray-400 hover:text-indigo-600 transition-colors flex-shrink-0"
            >
              <ArrowBackRoundedIcon />
            </button>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 truncate">{subject.name}</p>
              <p className="text-xs text-gray-400">
                Pregunta {session.currentIndex + 1} de {session.questions.length}
              </p>
            </div>
            <span className="text-sm font-bold text-indigo-600 flex-shrink-0">{progressPct}%</span>
          </div>
          <ProgressBar percentage={progressPct} colorClass="bg-indigo-500" heightClass="h-1.5" />
        </div>
      </div>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-4">
        {/* Enunciado de la pregunta */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            Pregunta {session.currentIndex + 1}
          </p>
          <p className="text-gray-900 text-lg font-medium leading-relaxed">
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
              {isLastQuestion ? 'Ver resultados' : 'Siguiente pregunta →'}
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
