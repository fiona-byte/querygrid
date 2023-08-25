import { useEffect, useState } from 'react';

export const usePagination = (pages: number) => {
  const [paginate, setPaginate] = useState(0);
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);

  useEffect(() => {
    setNextPage(pages > 10);
  }, [pages]);

  const paginationHandler = (backward: boolean) => {
    if (backward) {
      const newPage = paginate - 10;
      const page = newPage <= 1 ? 0 : newPage;
      !page && setPrevPage(false);
      setNextPage(true);
      setPaginate(page);
    } else {
      const newPage = paginate + 10;
      const page = paginate === 0 ? newPage + 1 : newPage;
      page > pages || (page + 10 > pages && setNextPage(false));
      setPrevPage(true);
      setPaginate(page);
    }
  };

  return { paginate, prevPage, nextPage, paginationHandler };
};
