import { useWindowSize } from './useWindowSize';

export const useMobile = () => {
  const { width } = useWindowSize();

  return width < 768;
};
