import { IAuthed } from '../store/authContext';

export const getLocalStorage = (): IAuthed | null => {
  const getLocalStorage = localStorage.getItem('AUTH');
  return getLocalStorage ? JSON.parse(getLocalStorage) : null;
};
