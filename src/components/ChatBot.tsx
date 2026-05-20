import { useEffect, useRef, useState } from 'react';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import type { ChatMessage, SubjectId } from '../types';
import { useChatBot } from '../hooks/useChatBot';

interface ChatBotProps {
  subjectId?: SubjectId;
}

const WELCOME_MESSAGE =
  'Hola! Soy tu asistente de estudio para Saber Pro. Puedes preguntarme sobre los temas de las areas evaluadas o pedirme que te explique conceptos.';

const ChatBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={[
          'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'rounded-br-sm bg-indigo-600 text-white'
            : 'rounded-bl-sm border border-gray-200 bg-white text-gray-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100',
        ].join(' ')}
      >
        {message.content}
      </div>
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-gray-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 dark:bg-slate-400"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  </div>
);

const ChatInput = ({
  onSend,
  isLoading,
}: {
  onSend: (text: string) => void;
  isLoading: boolean;
}) => {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (!value.trim() || isLoading) return;
    onSend(value.trim());
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 border-t border-gray-200 p-3 dark:border-slate-700">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe tu pregunta..."
        rows={1}
        disabled={isLoading}
        className="flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none transition-colors focus:border-indigo-400 focus:bg-white disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-indigo-500"
      />
      <button
        type="button"
        onClick={handleSend}
        disabled={!value.trim() || isLoading}
        aria-label="Enviar mensaje"
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition-colors hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 dark:disabled:bg-slate-700 dark:disabled:text-slate-500"
      >
        <SendRoundedIcon fontSize="small" />
      </button>
    </div>
  );
};

export const ChatBot = ({ subjectId }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isLoading, error, sendMessage, clearMessages } = useChatBot(subjectId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex h-[480px] w-[360px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-xl shadow-slate-900/15 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/30">
          <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950/40">
                <SmartToyRoundedIcon fontSize="small" className="text-indigo-600 dark:text-indigo-300" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-slate-100">
                  Asistente Saber Pro
                </p>
                <p className="text-xs text-gray-400 dark:text-slate-500">Siempre disponible</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={clearMessages}
                  aria-label="Limpiar conversacion"
                  className="rounded-xl p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                >
                  <DeleteOutlineRoundedIcon fontSize="small" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar chat"
                className="rounded-xl p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <CloseRoundedIcon fontSize="small" />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {messages.length === 0 && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-bl-sm border border-gray-200 bg-white px-4 py-2.5 text-sm leading-relaxed text-gray-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                  {WELCOME_MESSAGE}
                </div>
              </div>
            )}
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
            {isLoading && <TypingIndicator />}
            {error && (
              <p className="text-center text-xs text-red-500 dark:text-red-400">{error}</p>
            )}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput onSend={sendMessage} isLoading={isLoading} />
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Cerrar asistente' : 'Abrir asistente'}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-900/20 transition-all hover:scale-105 hover:bg-indigo-700 active:scale-95"
      >
        {isOpen ? <CloseRoundedIcon /> : <SmartToyRoundedIcon />}
      </button>
    </div>
  );
};
