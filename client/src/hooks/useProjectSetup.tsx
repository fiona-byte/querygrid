import { useQuery } from '@tanstack/react-query';
import userServices, { ProjectSetup } from '@service/userServices';
import { RequestError } from '@service/index';

export const useProjectSetup = () => {
  return useQuery<ProjectSetup, RequestError>({
    queryKey: ['project_setup'],
    queryFn: userServices.install,
    retry: 0,
    refetchOnWindowFocus: false,
  });
};
