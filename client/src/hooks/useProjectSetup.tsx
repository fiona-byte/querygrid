import { useQuery } from '@tanstack/react-query';
import userServices, { ProjectSetup } from '@service/userServices';
import { RequestError } from '@service/index';
import useSetupStore from '@store/setupStore';
import { useEffect } from 'react';

export const useProjectSetup = () => {
  const { install, setInstall } = useSetupStore();

  const query = useQuery<ProjectSetup, RequestError>({
    queryKey: ['project_setup'],
    queryFn: userServices.install,
    retry: 0,
    refetchOnWindowFocus: false,
    enabled: !install,
  });

  useEffect(() => {
    if (query?.data?.data) setInstall(query.data.data);
  }, [query.isSuccess]);

  return {
    ...query,
    isLoading: install ? false : query.isLoading,
    data: install ? { data: true } : query.data,
  };
};
