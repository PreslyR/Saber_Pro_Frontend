import type { ChatSendRequest, ChatSendResponse } from '../types';
import { getToken } from './authService';

const CHAT_URL: string = import.meta.env.VITE_CHAT_URL ?? '/api/chat';

const buildAuthHeaders = (): HeadersInit => {
  const token = getToken();

  if (!token) {
    throw new Error('No hay una sesion activa.');
  }

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const sendChatMessage = async (request: ChatSendRequest): Promise<ChatSendResponse> => {
  const response = await fetch(CHAT_URL, {
    method: 'POST',
    headers: buildAuthHeaders(),
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Tu sesion expiro. Inicia sesion de nuevo.');
    }

    throw new Error('No fue posible obtener una respuesta. Intenta de nuevo.');
  }

  return response.json() as Promise<ChatSendResponse>;
};
