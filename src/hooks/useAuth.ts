import { useAuthStore, useUserStore } from 'context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setApiHeader } from 'utils/api';

export const useSetToken = () => {
  const token = useAuthStore(state => state.token);
  const navigate = useNavigate();
  if (!token) {
    useEffect(() => {
      navigate('/auth/login');
    }, []);
    return;
  }
  setApiHeader('Authorization', `Token ${token}`);
};

export const useClearToken = () => {
  const clearToken = useAuthStore(state => state.clearToken);
  const clearUser = useUserStore(state => state.clearUser);
  const navigate = useNavigate();
  return () => {
    clearToken();
    clearUser();
    setApiHeader('Authorization', '');
    navigate('/auth/login');
  };
};
