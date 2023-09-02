import { ReactNode } from 'react';
import CurrentPage from '@component/currentPage';

type PageLayoutProps = {
  children: ReactNode;
  page: string;
  title?: string;
};

const PageLayout = ({ page, title, children }: PageLayoutProps) => (
  <>
    <CurrentPage title={title} page={page} />
    {children}
  </>
);

export default PageLayout;
