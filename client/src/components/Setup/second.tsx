import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Card, Para, Form, Input, SubmitButton, Title } from '@assets/styles/auth.styles';
import { useToaster } from '@hooks/useToaster';
import { useNavigate } from 'react-router-dom';
import { utils } from '@utils/index';
import userServices from '@service/userServices';
import { Button, styled } from '@mui/material';

const forms = [
  {
    type: 'text',
    label: 'First Name',
    name: 'firstName',
    placeholder: 'First Name',
  },
  {
    type: 'text',
    label: 'Last Name',
    name: 'lastName',
    placeholder: 'Last Name',
  },
  {
    type: 'text',
    label: 'Email',
    name: 'email',
    placeholder: 'What’s your email address?',
  },
  {
    type: 'password',
    label: 'Password',
    name: 'password',
    placeholder: 'Enter your password',
  },
] as const;

const schema = yup
  .object({
    firstName: yup
      .string()
      .trim('first name must not start or end with empty space')
      .min(3, 'first name must be at least 3 characters')
      .required('first name is required')
      .matches(/^[aA-zZ\s]+$/, 'first name must be alphabet only'),
    lastName: yup
      .string()
      .trim('last name must not start or end with empty space')
      .min(3, 'last name must be at least 3 characters')
      .required('last name is required')
      .matches(/^[aA-zZ\s]+$/, 'last name must be alphabet only'),
    email: yup.string().email('invalid email').required('email is required'),
    password: yup.string().required('password is required'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

type SecondProps = {
  handleBack: () => void;
};

const Second = ({ handleBack }: SecondProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toaster = useToaster();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const setupMutation = useMutation((data: FormData) => userServices.setup(data), {
    onError: (error: any) => {
      const message = error?.response?.data?.errors || 'something went wrong';
      toaster.triggerToast({ message, type: 'error' });
    },
    onSuccess: () => {
      utils.setAuthentication();
      navigate('/projects');
    },
  });

  const onSubmit = (data: FormData) => setupMutation.mutate(data);

  return (
    <Card variant="outlined">
      <Title>{t('translations:create_an_account')}</Title>
      <Para>{t('translations:sign_up_desc')}</Para>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {forms.map(({ placeholder, name, type }) => (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field: { value, ...field } }) => (
              <Input
                type={type}
                fullWidth
                size="medium"
                variant="outlined"
                placeholder={placeholder}
                error={!!errors[name]}
                helperText={errors[name]?.message}
                {...field}
              />
            )}
          />
        ))}

        <SubmitButton disabled={setupMutation.isLoading} type="submit" fullWidth variant="contained">
          Create an account
        </SubmitButton>
        <BackButton>
          <Button onClick={handleBack}>Back</Button>
        </BackButton>
      </Form>
    </Card>
  );
};

const BackButton = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '20px',
});

export default Second;
