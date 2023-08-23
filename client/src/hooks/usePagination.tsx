import { useState } from 'react';

export const usePagination = () => {
  const [paginate, setPaginate] = useState(0);

  const paginationHandler = (backward: boolean) => {
    if (backward) {
      setPaginate((prevState) => {
        const newPage = prevState - 10;
        return newPage <= 1 ? 0 : newPage;
      });
    } else {
      setPaginate((prevState) => {
        const newPage = prevState + 10;
        return prevState === 0 ? newPage + 1 : newPage;
      });
    }
  };

  return { paginate, paginationHandler };
};
