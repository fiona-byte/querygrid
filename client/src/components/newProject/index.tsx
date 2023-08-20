import Typography from '@component/typography';
import { Box, Button, Dialog, IconButton, TextField, styled } from '@mui/material';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type NewProject = {
  open: boolean;
  closeHandler: () => void;
};

const NewProject = ({ open, closeHandler }: NewProject) => {
  const { t } = useTranslation();

  return (
    <Dialog onClose={closeHandler} open={open}>
      <ModalBox>
        <ModalTitle>
          <Heading variant="h5">{t('translations:new_project')}</Heading>
          <IconButton onClick={closeHandler}>
            <X size={24} color="#35343C" />
          </IconButton>
        </ModalTitle>
        <Paragraph>{t('translations:new_project_desc')}</Paragraph>
        <form noValidate autoComplete="off">
          <TextField
            sx={{ mb: '24px' }}
            fullWidth
            id="project-name"
            variant="outlined"
            placeholder={t('translations:project_name')}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            id="project-desc"
            variant="outlined"
            placeholder={t('translations:project_description')}
            sx={{ mb: '64px' }}
          />

          <SubmitButton variant="contained" size="large" fullWidth>
            <ButtonText>{t('translations:create_project')}</ButtonText>
          </SubmitButton>
        </form>
      </ModalBox>
    </Dialog>
  );
};

const ModalBox = styled(Box)({
  width: '100%',
  maxWidth: '500px',
  padding: '40px',

  '@media (max-width: 768px)': {
    padding: '20px',
  },
});

const ModalTitle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Heading = styled(Typography.Heading)({
  fontSize: '34px',
  fontWeight: 600,

  '@media (max-width: 768px)': {
    fontSize: '24px',
  },
});

const Paragraph = styled(Typography.Paragraph)({
  fontSize: '14px',
  fontWeight: 400,
  color: '#57565D',
  marginTop: '8px',
  marginBottom: '32px',
});

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: '18px 42px',
}));

const ButtonText = styled(Typography.Paragraph)({
  fontSize: '16px',
  fontWeight: 600,
  color: '#ffffff',
  textTransform: 'capitalize',
});

export default NewProject;
