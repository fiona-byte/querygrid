import { Button, styled } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { string, object, InferType } from 'yup';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Card, Para, Form, Input, SubmitButton, Title } from '@assets/styles/auth.styles';
import { Navigate } from 'react-router-dom';
import { utils } from '@utils/index';
import userServices from '@service/userServices';
import Toaster from '@component/toaster';
import { RequestError } from '@service/index';

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

const schema = object({
  firstName: string()
    .trim('first name must not start or end with empty space')
    .min(3, 'first name must be at least 3 characters')
    .required('first name is required')
    .matches(/^[aA-zZ\s]+$/, 'first name must be alphabet only'),
  lastName: string()
    .trim('last name must not start or end with empty space')
    .min(3, 'last name must be at least 3 characters')
    .required('last name is required')
    .matches(/^[aA-zZ\s]+$/, 'last name must be alphabet only'),
  email: string().email('invalid email').required('email is required'),
  password: string().required('password is required'),
}).required();
type FormData = InferType<typeof schema>;

type SecondProps = {
  handleBack: () => void;
};

const Second = ({ handleBack }: SecondProps) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { isLoading, isSuccess, isError, error, mutate } = useMutation<unknown, RequestError, FormData>({
    mutationKey: ['setup_project'],
    mutationFn: (data) => userServices.setup(data),
  });
  const errorMessage = error?.response?.data?.errors || 'something went wrong';

  const onSubmit = (data: FormData) => mutate(data);

  if (isSuccess) {
    utils.setAuthentication();
    return <Navigate to="/projects" />;
  }

  return (
    <>
      <Toaster show={isError} message={errorMessage} type="error" />
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

          <SubmitButton disabled={isLoading} type="submit" fullWidth variant="contained">
            Create an account
          </SubmitButton>
          <BackButton>
            <Button onClick={handleBack}>Back</Button>
          </BackButton>
        </Form>
      </Card>
    </>
  );
};

const BackButton = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '20px',
});

export default Second;
