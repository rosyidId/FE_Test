import { useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

interface UseCurrentUserReturn {
  isLoading: boolean;
  error: string | null;
  user: User | null;
  fetchUser: () => void;
}

const useCurrentUser = (): UseCurrentUserReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        throw new Error('No token found, please login first.');
      }
      const response = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUser(data); 
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(); 
  }, []);

  return { isLoading, error, user, fetchUser };
};

export default useCurrentUser;
