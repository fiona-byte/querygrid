import { useQuery } from '@tanstack/react-query';
import userServices, { User } from '@service/userServices';
import { RequestError } from '@service/index';

export const useUser = () => {
  const { isLoading, data } = useQuery<User, RequestError>({
    queryKey: ['me'],
    queryFn: userServices.me,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { isLoading, user: data?.data };
};
