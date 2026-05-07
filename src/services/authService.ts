const TOKEN_KEY = 'saber_pro_token';

const AUTH_URL: string = import.meta.env.VITE_AUTH_URL;

export interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

export const login = async (credentials: LoginCredentials): Promise<void> => {
  const response = await fetch(AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error((data as { message?: string }).message ?? 'Credenciales inválidas');
  }

  const data = (await response.json()) as LoginResponse;
  localStorage.setItem(TOKEN_KEY, data.access_token);
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return Boolean(getToken());
};
