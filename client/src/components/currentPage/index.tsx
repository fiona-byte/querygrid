import { Helmet } from 'react-helmet-async';

type CurrentPageProps = {
  title?: string;
  page: string;
};

const CurrentPage = ({ title, page }: CurrentPageProps) => {
  const pageTitle = title || 'QueryGrid';
  return <Helmet title={`${pageTitle} | ${page}`} />;
};

export default CurrentPage;
