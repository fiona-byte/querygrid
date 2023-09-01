import { ReactNode, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import userServices from '@service/userServices';
import Loader from '@component/loader';

type AppSetupProps = {
  children: ReactNode;
};

export const AppSetupContext = createContext({
  install: false,
});

const AppSetupProvider = ({ children }: AppSetupProps) => {
  const navigate = useNavigate();
  const [install, setInstall] = useState(false);

  const { isLoading } = useQuery(['install'], userServices.install, {
    retry: 0,
    refetchOnWindowFocus: false,
    onError(error: any) {
      console.log(error);
    },
    onSuccess({ data }) {
      if (data.data) setInstall(true);
      else navigate('/setup');
    },
  });

  return <AppSetupContext.Provider value={{ install }}>{isLoading ? <Loader /> : children}</AppSetupContext.Provider>;
};

export default AppSetupProvider;
