import { useQuery } from '@tanstack/react-query';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import userServices from '../services/userServices';
import { utils } from '../utils';

type Role = {
  id: string;
  name: string;
  permissions: { [key: string]: string[] };
  created_at: string;
  updated_at: string;
};

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role_id: string;
  role: Role;
  created_at: string;
  updated_at: string;
};

type AuthUserContext = {
  user?: User;
};

export const AuthUserContext = createContext<AuthUserContext>({});

const AuthUserProvider = ({ children }: { children?: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const redirect = () => {
    utils.clearAuthentication();
    navigate('/login');
  };

  const userQuery = useQuery(['me'], userServices.me, {
    retry: false,
    refetchOnWindowFocus: false,
    onError(error: any) {
      if (error?.response?.data?.message === 'invalid token') {
        redirect();
      } else {
        //
      }
    },
    onSuccess({ data }) {
      setCurrentUser(data.data as User);
    },
  });

  useEffect(() => {
    const isAuthenticated = utils.getAuthentication();
    if (isAuthenticated) userQuery.refetch().finally(() => setLoading(false));
    else redirect();
  }, [location]);

  return (
    <AuthUserContext.Provider value={{ user: currentUser }}>
      {loading ? <div>Loading</div> : children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserProvider;
