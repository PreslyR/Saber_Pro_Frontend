import { useCallback, useEffect, useMemo, useState } from 'react';
import type { OptionId, QuizOption, RehearsalAnswerSubmission, RehearsalSessionSubmission, SubjectId, WrongAnswer } from '../types';
import { getWrongAnswers, saveRehearsalSession } from '../services/rehearsalService';

interface RehearsalQuestion {
  sourceAnswerId: number;
  statement: string;
  options: QuizOption[];
  correctOptionId: OptionId;
  explanation: string;
}

interface UseRehearsalReturn {
  questions: RehearsalQuestion[];
  currentIndex: number;
  selectedOptionId: OptionId | null;
  hasAnswered: boolean;
  isLastQuestion: boolean;
  isFinished: boolean;
  correctCount: number;
  totalQuestions: number;
  answers: RehearsalAnswerSubmission[];
  isLoading: boolean;
  error: string | null;
  hasWrongAnswers: boolean;
  isSavingResult: boolean;
  saveError: string | null;
  selectOption: (optionId: OptionId) => void;
  confirmAnswer: () => void;
  nextQuestion: () => void;
  retrySaveResult: () => void;
}

const mapWrongAnswerToQuestion = (wrong: WrongAnswer): RehearsalQuestion => ({
  sourceAnswerId: wrong.sourceAnswerId,
  statement: wrong.statement,
  options: wrong.options,
  correctOptionId: wrong.correctOptionId,
  explanation: wrong.explanation,
});

export const useRehearsal = (subjectId: SubjectId): UseRehearsalReturn => {
  const [questions, setQuestions] = useState<RehearsalQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<OptionId | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState<RehearsalAnswerSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSavingResult, setIsSavingResult] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [hasSavedResult, setHasSavedResult] = useState(false);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setError(null);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setHasAnswered(false);
    setIsFinished(false);
    setAnswers([]);
    setIsSavingResult(false);
    setSaveError(null);
    setHasSavedResult(false);

    const load = async () => {
      try {
        const wrongAnswers = await getWrongAnswers(subjectId);
        if (!isMounted) return;
        setQuestions(wrongAnswers.map(mapWrongAnswerToQuestion));
      } catch {
        if (!isMounted) return;
        setError('No se pudieron cargar las preguntas incorrectas. Intenta de nuevo.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      isMounted = false;
    };
  }, [subjectId]);

  const hasWrongAnswers = !isLoading && questions.length > 0;

  const isLastQuestion = questions.length > 0 && currentIndex === questions.length - 1;

  const totalQuestions = questions.length;

  const correctCount = useMemo(
    () => answers.filter((answer) => answer.isCorrect).length,
    [answers],
  );

  const buildSessionPayload = useCallback((): RehearsalSessionSubmission | null => {
    if (!isFinished || questions.length === 0) {
      return null;
    }

    return {
      subjectId,
      answers,
    };
  }, [isFinished, questions.length, subjectId, answers]);

  const persistSession = useCallback(async () => {
    const payload = buildSessionPayload();

    if (!payload) {
      setSaveError('No fue posible preparar la sesion para guardarla.');
      return;
    }

    setIsSavingResult(true);
    setSaveError(null);

    try {
      await saveRehearsalSession(payload);
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
  }, [buildSessionPayload]);

  useEffect(() => {
    if (!isFinished || hasSavedResult) {
      return;
    }

    void persistSession();
  }, [hasSavedResult, persistSession, isFinished]);

  const selectOption = (optionId: OptionId) => {
    if (hasAnswered) return;
    setSelectedOptionId(optionId);
  };

  const confirmAnswer = () => {
    if (!selectedOptionId || hasAnswered) return;

    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedOptionId === currentQuestion.correctOptionId;
    const record: RehearsalAnswerSubmission = {
      sourceAnswerId: currentQuestion.sourceAnswerId,
      selectedOptionId,
      isCorrect,
    };

    setAnswers((prev) => [...prev, record]);
    setHasAnswered(true);
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
      setIsFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }

    setSelectedOptionId(null);
    setHasAnswered(false);
  };

  const retrySaveResult = () => {
    if (isSavingResult) return;
    void persistSession();
  };

  return {
    questions,
    currentIndex,
    selectedOptionId,
    hasAnswered,
    isLastQuestion,
    isFinished,
    correctCount,
    totalQuestions,
    answers,
    isLoading,
    error,
    hasWrongAnswers,
    isSavingResult,
    saveError,
    selectOption,
    confirmAnswer,
    nextQuestion,
    retrySaveResult,
  };
};
