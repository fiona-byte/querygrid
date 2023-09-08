import { useTranslation } from 'react-i18next';
import { useUser } from '@hooks/useUser';
import PageLayout from '@layout/page';
import { useProject } from '@hooks/useProject';

const Overview = () => {
  const { project } = useProject();
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <PageLayout page="Overview">
      <p>{project?.name}</p>
      Hello I am: {user?.first_name}, my role is: {user?.role.name}, Overview <p>{t('translations:hello_world')}</p>
      <p>{t('translations:my_name')}</p>
    </PageLayout>
  );
};

export default Overview;
