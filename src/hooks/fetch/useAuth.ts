import { useNavigate } from 'react-router-dom';
import { ILogin, ILoginResponse, IBaseError, IProfileResponse } from 'interfaces';
import { useMutation, useQuery } from 'react-query';
import { getProfile, postLogin, postRegister } from 'api';
import { useAuthStore, useUserStore } from 'context';
import { setApiHeader } from 'utils/api';

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore(state => state.setToken);
  return useMutation<ILoginResponse, IBaseError, ILogin>('login', postLogin, {
    onSuccess: ({ token }) => {
      setToken(token);
      setApiHeader('Authorization', `Token ${token}`);
      navigate('/app/chat');
    },
  });
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore(state => state.setToken);
  return useMutation<ILoginResponse, IBaseError, ILogin>('register', postRegister, {
    onSuccess: ({ token }) => {
      setToken(token);
      setApiHeader('Authorization', `Token ${token}`);
      navigate('/app/chat');
    },
  });
};

export const useProfileQuery = () => {
  const clearUser = useUserStore(state => state.clearUser);
  const setUser = useUserStore(state => state.setUser);
  const setToken = useAuthStore(state => state.setToken);
  const navigate = useNavigate();
  return useQuery<IProfileResponse, IBaseError>('profile', getProfile, {
    onSuccess: ({ user }) => {
      setUser({
        id: user._id,
        username: user.username,
      });
    },
    onError: () => {
      clearUser();
      setToken('');
      setApiHeader('Authorization', '');
      navigate('/auth/login');
    },
  });
};
