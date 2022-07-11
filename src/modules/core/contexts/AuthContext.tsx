import SpinnerComponent from '@core/components/spinner/Fallback-spinner';
import { User } from 'modules/user/types';
import { userApi } from 'modules/user/utils/api';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LOGIN } from 'router/path';
import { LS_KEY } from '../constants';

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextState {
  user?: User;
  fetchUser?: () => Promise<void>;
  accessToken?: string;
  setAccessToken?: (accessToken: string) => void;
  logout?: () => void;
}

const AuthContext = React.createContext<AuthContextState>({});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const history = useHistory();

  const [user, setUser] = useState<User>();
  const [accessToken, setAccessToken] = useState<string>();
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);

    try {
      const data = await userApi.me();
      setUser(data.data.user);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const lsAccessToken = JSON.parse(
      localStorage.getItem(LS_KEY.userInfo) || '{}',
    ).accessToken;

    if (lsAccessToken) {
      setAccessToken(lsAccessToken);
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    setAccessToken(undefined);
    setUser(undefined);

    history.push(LOGIN);
  };

  return (
    <AuthContext.Provider
      value={{ user, fetchUser, accessToken, setAccessToken, logout }}
    >
      {loading ? <SpinnerComponent /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth: () => AuthContextState = () => {
  const context = useContext<AuthContextState>(AuthContext);
  if (!context) {
    throw new Error('useAuth must be inside a AuthProvider with a state value');
  }
  return context;
};
