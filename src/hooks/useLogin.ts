import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

interface UseLoginReturn {
  isLoading: boolean;
  error: string | null;
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void; 
}

const useLogin = (): UseLoginReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      setUser(data);
      localStorage.setItem('token', data.accessToken); 
      navigate('/'); 
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setTimeout(() => setError(null), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null); 
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  return { isLoading, error, user, login, logout }; 
};

export default useLogin;
