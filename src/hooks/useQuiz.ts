import { useCallback, useEffect, useMemo, useState } from 'react';
import type { OptionId, QuizAnswerRecord, QuizAttemptSubmission, QuizSession, SubjectId } from '../types';
import { fetchQuestionsForSubject } from '../services/questionService';
import { saveQuizAttempt } from '../services/progressService';

const QUESTIONS_PER_SESSION = 5;

interface UseQuizReturn {
  session: QuizSession;
  selectedOptionId: OptionId | null;
  hasAnswered: boolean;
  isLastQuestion: boolean;
  correctCount: number;
  isLoading: boolean;
  error: string | null;
  isSavingResult: boolean;
  saveError: string | null;
  selectOption: (optionId: OptionId) => void;
  confirmAnswer: () => void;
  nextQuestion: () => void;
  restartQuiz: () => void;
  retrySaveResult: () => void;
}

const buildEmptySession = (subjectId: SubjectId): QuizSession => ({
  subjectId,
  questions: [],
  currentIndex: 0,
  answers: [],
  isFinished: false,
});

export const useQuiz = (subjectId: SubjectId): UseQuizReturn => {
  const [session, setSession] = useState<QuizSession>(() => buildEmptySession(subjectId));
  const [selectedOptionId, setSelectedOptionId] = useState<OptionId | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSavingResult, setIsSavingResult] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [hasSavedResult, setHasSavedResult] = useState(false);

  const loadQuestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSession(buildEmptySession(subjectId));
    setSelectedOptionId(null);
    setHasAnswered(false);
    setIsSavingResult(false);
    setSaveError(null);
    setHasSavedResult(false);

    try {
      const questions = await fetchQuestionsForSubject(subjectId, QUESTIONS_PER_SESSION);
      setSession((prev) => ({ ...prev, questions }));
    } catch {
      setError('No se pudieron cargar las preguntas. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, [subjectId]);

  useEffect(() => {
    void loadQuestions();
  }, [loadQuestions]);

  const isLastQuestion = session.currentIndex === session.questions.length - 1;

  const correctCount = useMemo(
    () => session.answers.filter((answer) => answer.isCorrect).length,
    [session.answers],
  );

  const buildAttemptPayload = useCallback((): QuizAttemptSubmission | null => {
    if (!session.isFinished || session.questions.length === 0) {
      return null;
    }

    const answersByQuestionId = new Map<string, QuizAnswerRecord>(
      session.answers.map((answer) => [answer.questionId, answer]),
    );

    const answers = session.questions.map((question) => {
      const selectedAnswer = answersByQuestionId.get(question.id);

      if (!selectedAnswer) {
        return null;
      }

      return {
        statement: question.statement,
        options: question.options,
        selectedOptionId: selectedAnswer.selectedOptionId,
        correctOptionId: question.correctOptionId,
        explanation: question.explanation,
      };
    });

    if (answers.some((answer) => answer === null)) {
      return null;
    }

    return {
      subjectId: session.subjectId,
      answers: answers.filter((answer): answer is NonNullable<typeof answer> => answer !== null),
    };
  }, [session]);

  const persistAttempt = useCallback(async () => {
    const payload = buildAttemptPayload();

    if (!payload) {
      setSaveError('No fue posible preparar el intento para guardarlo.');
      return;
    }

    setIsSavingResult(true);
    setSaveError(null);

    try {
      await saveQuizAttempt(payload);
      setHasSavedResult(true);
    } catch (err) {
      setSaveError(
        err instanceof Error
          ? err.message
          : 'No fue posible guardar tu resultado. Intenta de nuevo.',
      );
    } finally {
      setIsSavingResult(false);
    }
  }, [buildAttemptPayload]);

  useEffect(() => {
    if (!session.isFinished || hasSavedResult) {
      return;
    }

    void persistAttempt();
  }, [hasSavedResult, persistAttempt, session.isFinished]);

  const selectOption = (optionId: OptionId) => {
    if (hasAnswered) return;
    setSelectedOptionId(optionId);
  };

  const confirmAnswer = () => {
    if (!selectedOptionId || hasAnswered) return;

    const currentQuestion = session.questions[session.currentIndex];
    const isCorrect = selectedOptionId === currentQuestion.correctOptionId;
    const record: QuizAnswerRecord = {
      questionId: currentQuestion.id,
      selectedOptionId,
      isCorrect,
    };

    setSession((prev) => ({ ...prev, answers: [...prev.answers, record] }));
    setHasAnswered(true);
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
      setSession((prev) => ({ ...prev, isFinished: true }));
    } else {
      setSession((prev) => ({ ...prev, currentIndex: prev.currentIndex + 1 }));
    }

    setSelectedOptionId(null);
    setHasAnswered(false);
  };

  const restartQuiz = () => {
    void loadQuestions();
  };

  const retrySaveResult = () => {
    if (isSavingResult) return;
    void persistAttempt();
  };

  return {
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
  };
};
