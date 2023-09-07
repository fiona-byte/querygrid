import { useForm, Controller } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType, object, string } from 'yup';
import { useMutation } from '@tanstack/react-query';
import Typography from '@component/typography';
import { Box, Button, Dialog, IconButton, TextField, styled } from '@mui/material';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import projectServices, { type CreateProject } from '@service/projectServices';
import Toaster from '@component/toaster';
import { RequestError } from '@service/index';

type NewProject = {
  open: boolean;
  closeHandler: () => void;
};

const schema = object({
  name: string()
    .trim('project name must not start or end with empty space')
    .min(3, 'project name must be at least 3 characters')
    .required('project name is required')
    .matches(/^[aA-zZ\s]+$/, 'project name must be alphabet only'),
  description: string().trim().default(''),
});
type FormData = InferType<typeof schema>;

const NewProject = ({ open, closeHandler }: NewProject) => {
  const { t } = useTranslation();
  const { control, handleSubmit, setError, formState } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  const { isLoading, isSuccess, data, isError, error, mutate } = useMutation<CreateProject, RequestError, FormData>({
    mutationKey: ['create_project'],
    mutationFn: (data) => projectServices.createProject(data),
  });
  const errorMessage = error?.response?.data?.errors || 'something went wrong';

  const onSubmit = (data: FormData) => mutate(data);

  if (isSuccess) {
    return <Navigate to={`/project/${data.data.id}`} />;
  }

  if (isError) {
    if (typeof errorMessage === 'object') {
      setError('name', { message: errorMessage?.name });
    }
  }

  return (
    <>
      <Toaster show={isError} message={errorMessage} type="error" />
      <Dialog onClose={closeHandler} open={open}>
        <ModalBox>
          <ModalTitle>
            <Heading variant="h5">{t('translations:new_project')}</Heading>
            <IconButton onClick={closeHandler}>
              <X size={24} color="#35343C" />
            </IconButton>
          </ModalTitle>
          <Paragraph>{t('translations:new_project_desc')}</Paragraph>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <Controller
              name="name"
              control={control}
              render={({ field: { value, ...field } }) => (
                <TextField
                  sx={{ mb: '24px' }}
                  fullWidth
                  id="project-name"
                  variant="outlined"
                  placeholder={t('translations:project_name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field: { value, ...field } }) => (
                <TextArea
                  fullWidth
                  multiline
                  rows={4}
                  id="project-desc"
                  variant="outlined"
                  placeholder={t('translations:project_description')}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  {...field}
                />
              )}
            />

            <SubmitButton disabled={isLoading} variant="contained" type="submit" size="large" fullWidth>
              <ButtonText>{t('translations:create_project')}</ButtonText>
            </SubmitButton>
          </form>
        </ModalBox>
      </Dialog>
    </>
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

const TextArea = styled(TextField)({
  marginBottom: '64px',

  '@media (max-width: 768px)': {
    marginBottom: '34px',
  },
});

export default NewProject;
