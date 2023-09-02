import { useTranslation } from 'react-i18next';
import { useUser } from '@hooks/useUser';
import PageLayout from '@layout/page';

const Overview = () => {
  const { t } = useTranslation();
  const user = useUser();

  return (
    <PageLayout page="Overview">
      Hello I am: {user?.first_name}, my role is: {user?.role.name}, Overview <p>{t('translations:hello_world')}</p>
      <p>{t('translations:my_name')}</p>
    </PageLayout>
  );
};

export default Overview;
