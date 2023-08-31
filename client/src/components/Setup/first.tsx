import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, styled } from '@mui/material';
import { useTranslator } from '@hooks/useTranslator';
import typography from '@component/typography';
import { Languages } from '@lang/type';
import { Card, Para, Form, SubmitButton, Title } from '@assets/styles/auth.styles';
import images from '@assets/images';

type FirstProps = {
  handleNext: () => void;
};

const First = ({ handleNext }: FirstProps) => {
  const { language, languages, changeLanguage } = useTranslator();
  const { t } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    changeLanguage(event.target.value as Languages);
  };

  return (
    <Card variant="outlined">
      <Title>{t('translations:welcome_to_querygrid')}</Title>
      <Para>{t('translations:prefered_language')}</Para>
      <Form>
        <FormControl fullWidth>
          <InputLabel id="select-language">{t('translations:language')}</InputLabel>
          <SelectForm
            labelId="select-language"
            id="select-languages"
            value={language}
            label={t('translations:language')}
            onChange={handleChange}
          >
            {languages.map((language) => (
              <SelectOption key={language.short} value={language.short}>
                <FlagImage src={images.flags[language.short]} alt={language.name} />
                <SelectText>{language.name}</SelectText>
              </SelectOption>
            ))}
          </SelectForm>
        </FormControl>
      </Form>
      <SubmitButton fullWidth variant="contained" onClick={handleNext}>
        Next
      </SubmitButton>
    </Card>
  );
};

const SelectForm = styled(Select)({
  '#select-languages': {
    display: 'flex',
    alignItems: 'center',
  },
}) as unknown as typeof Select;

const SelectOption = styled(MenuItem)({
  display: 'flex',
  alignItems: 'center',
});

const FlagImage = styled('img')({
  width: '20px',
  height: '20px',
  borderRadius: '4px',
});

export const SelectText = styled(typography.Paragraph)`
  margin-left: 14px;
  font-size: 16px;
  font-weight: 400;
  color: #78787d;
  text-transform: capitalize;
`;

export default First;
