import { useCallback, useState } from 'react';
import type { ChatMessage, SubjectId } from '../types';
import { sendChatMessage } from '../services/chatService';

interface UseChatBotReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (text: string) => Promise<void>;
  clearMessages: () => void;
}

const buildMessage = (role: ChatMessage['role'], content: string): ChatMessage => ({
  id: `${Date.now()}-${Math.random()}`,
  role,
  content,
  timestamp: Date.now(),
});

export const useChatBot = (subjectId?: SubjectId): UseChatBotReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();

      if (!trimmed || isLoading) return;

      setMessages((prev) => [...prev, buildMessage('user', trimmed)]);
      setIsLoading(true);
      setError(null);

      try {
        const { reply } = await sendChatMessage({ message: trimmed, subjectId });
        setMessages((prev) => [...prev, buildMessage('assistant', reply)]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al obtener respuesta.');
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, subjectId],
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, isLoading, error, sendMessage, clearMessages };
};
