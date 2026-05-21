import { useState, useEffect } from 'react';
import { fetchSituation, validateWritingAnswer } from '../services/situationService';
import type { Situation, SituationValidationResult } from '../types';

export const useSituation = () => {
  const [situation, setSituation] = useState<Situation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<SituationValidationResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [loadTrigger, setLoadTrigger] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);
    setSituation(null);
    setAnswer('');
    setValidationResult(null);
    setValidationError(null);

    const load = async () => {
      try {
        const data = await fetchSituation();
        if (!isMounted) return;
        setSituation(data);
      } catch {
        if (!isMounted) return;
        setError('No se pudo cargar la situación. Intenta de nuevo.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void load();
    return () => {
      isMounted = false;
    };
  }, [loadTrigger]);

  const restart = () => setLoadTrigger((prev) => prev + 1);

  const validate = async () => {
    if (!situation || !answer.trim()) return;
    setIsValidating(true);
    setValidationError(null);
    try {
      const result = await validateWritingAnswer(situation.id, answer.trim());
      setValidationResult(result);
    } catch {
      setValidationError('No se pudo validar la respuesta. Intenta de nuevo.');
    } finally {
      setIsValidating(false);
    }
  };

  return {
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
  };
};
