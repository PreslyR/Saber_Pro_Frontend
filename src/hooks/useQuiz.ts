import { useState, useMemo, useEffect, useCallback } from 'react';
import type { OptionId, QuizAnswerRecord, QuizSession, SubjectId } from '../types';
import { fetchQuestionsForSubject } from '../services/questionService';

const QUESTIONS_PER_SESSION = 20;

interface UseQuizReturn {
  session: QuizSession;
  selectedOptionId: OptionId | null;
  hasAnswered: boolean;
  isLastQuestion: boolean;
  correctCount: number;
  isLoading: boolean;
  error: string | null;
  selectOption: (optionId: OptionId) => void;
  confirmAnswer: () => void;
  nextQuestion: () => void;
  restartQuiz: () => void;
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

  const loadQuestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSession(buildEmptySession(subjectId));
    setSelectedOptionId(null);
    setHasAnswered(false);
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
    loadQuestions();
  }, [loadQuestions]);

  const isLastQuestion = session.currentIndex === session.questions.length - 1;

  const correctCount = useMemo(
    () => session.answers.filter((a) => a.isCorrect).length,
    [session.answers],
  );

  const selectOption = (optionId: OptionId) => {
    if (hasAnswered) return;
    setSelectedOptionId(optionId);
  };

  const confirmAnswer = () => {
    if (!selectedOptionId || hasAnswered) return;
    const currentQuestion = session.questions[session.currentIndex];
    const isCorrect = selectedOptionId === currentQuestion.correctOptionId;
    const record: QuizAnswerRecord = { questionId: currentQuestion.id, selectedOptionId, isCorrect };
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
    loadQuestions();
  };

  return { session, selectedOptionId, hasAnswered, isLastQuestion, correctCount, isLoading, error, selectOption, confirmAnswer, nextQuestion, restartQuiz };
};
