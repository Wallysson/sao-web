import { ReactNode, createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export type UserType = {
  iControleUSU: number;
  sLoginUSU: string;
  sNomeUSU: string;
  iControleGRU: number;
  sNomeGRU: string;
};

interface SessionContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  isAuthenticated: boolean;
}

export const SessionContext = createContext({} as SessionContextType);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    const storedUser = localStorage.getItem('user');
    const isAuthenticated = token && storedUser;

    if (!isAuthenticated) {
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      return navigate('/login');
    }

    setUser(JSON.parse(storedUser));
    setIsAuthenticated(true);
  }, [navigate]);

  return (
    <SessionContext.Provider value={{ user, setUser, isAuthenticated }}>
      {children}
    </SessionContext.Provider>
  );
}
