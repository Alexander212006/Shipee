import { AUTH_SESSION_STORAGE_KEY } from '../constants/storage';

type AuthSession = {
  isAuthorized: boolean;
};

const parseAuthSession = (value: string | null): AuthSession | null => {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as AuthSession;
  } catch {
    return null;
  }
};

export const isUserAuthorized = (): boolean => {
  const sessionValue = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
  const parsedSession = parseAuthSession(sessionValue);
  return parsedSession?.isAuthorized === true;
};

export const setAuthorizedSession = (): void => {
  const session: AuthSession = { isAuthorized: true };
  window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));
};

export const clearAuthorizedSession = (): void => {
  window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
};
