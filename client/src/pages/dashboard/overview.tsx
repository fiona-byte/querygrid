import { useTranslation } from 'react-i18next';
import { useUser } from '@hooks/useUser';

const Overview = () => {
  const { t } = useTranslation();
  const user = useUser();

  return (
    <div>
      Hello I am: {user?.first_name}, my role is: {user?.role.name}, Overview <p>{t('translations:hello_world')}</p>
      <p>{t('translations:my_name')}</p>
    </div>
  );
};

export default Overview;
