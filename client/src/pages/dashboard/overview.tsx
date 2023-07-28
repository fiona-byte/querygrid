import { useTranslation } from 'react-i18next';

const Overview = () => {
  const { t } = useTranslation();

  return (
    <div>
      Overview <p>{t('translations:hello_world')}</p>
      <p>{t('translations:my_name')}</p>
    </div>
  );
};

export default Overview;
