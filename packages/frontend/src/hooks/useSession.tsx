import { useContext } from 'react';
import { SessionContext } from '../context/SessionContext';

export function useSession() {
  const context = useContext(SessionContext);
  return context;
}
