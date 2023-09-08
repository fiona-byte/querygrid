import { Navigate, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, InferType } from 'yup';
import { useMutation } from '@tanstack/react-query';
import userServices from '@service/userServices';
import { utils } from '@utils/index';
import { Card, Para, Form, Input, SubmitButton, Title } from '@assets/styles/auth.styles';
import PageLayout from '@layout/page';
import Toaster from '@component/toaster';
import { RequestError } from '@service/index';

const forms = [
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
  email: string().email('invalid email').required('email is required'),
  password: string().required('password is required'),
}).required();
type FormData = InferType<typeof schema>;

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { isLoading, isError, mutate, error, isSuccess } = useMutation<unknown, RequestError, FormData>({
    mutationKey: ['user_login'],
    mutationFn: (data) => userServices.login(data),
  });

  const onSubmit = (data: FormData) => mutate(data);
  const errorMessage = error?.response?.data?.errors || 'something went wrong';

  if (isSuccess) {
    utils.setAuthentication();
    return <Navigate to="/projects" />;
  }

  // Redirect back if user is logged in
  if (utils.getAuthentication()) {
    return <Navigate to="/projects" />;
  }

  return (
    <PageLayout page="Login">
      <Toaster show={isError} message={errorMessage} type="error" />
      <Card variant="outlined">
        <Title>Sign In</Title>
        <Para>Login to your account to access your projects.</Para>
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
            Login
          </SubmitButton>
        </Form>

        <Para>
          <Link to="/reset-password">Forgot Password?</Link>
        </Para>
      </Card>
    </PageLayout>
  );
};

export default Login;
