import { RequestError } from '@service/index';
import projectServices, { Project } from '@service/projectServices';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const useProject = (projectId?: string) => {
  const { project } = useParams() as { project: string };
  const { data, isLoading, isError, error } = useQuery<Project, RequestError>({
    queryKey: ['single_project', projectId || project],
    queryFn: () => projectServices.getProjectById(projectId || project),
    retry: 0,
    refetchOnWindowFocus: false,
  });
  return { project: data?.data, isLoading, isError, error };
};
