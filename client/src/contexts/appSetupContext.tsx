import { ReactNode, createContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import userServices from '@service/userServices';
import { useNavigate } from 'react-router-dom';

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

  return (
    <AppSetupContext.Provider value={{ install }}>
      {isLoading ? <div>loadinggggg</div> : children}
    </AppSetupContext.Provider>
  );
};

export default AppSetupProvider;
