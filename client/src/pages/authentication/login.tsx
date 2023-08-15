import { useNavigate, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { Card, Para, Form, Input, SubmitButton, Title } from './styles';
import userServices from '../../services/userServices';
import { useToaster } from '../../hooks/useToaster';
import { utils } from '../../utils';

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

const schema = yup
  .object({
    email: yup.string().email('invalid email').required('email is required'),
    password: yup.string().required('password is required'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const toaster = useToaster();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const loginMutation = useMutation((data: FormData) => userServices.login(data), {
    onError: (error: any) => {
      const message = error?.response?.data?.errors || 'something went wrong';
      toaster.triggerToast({ message, type: 'error' });
    },
    onSuccess: () => {
      utils.setAuthentication();
      navigate('/projects');
    },
  });

  const onSubmit = (data: FormData) => loginMutation.mutate(data);

  return (
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
        <SubmitButton disabled={loginMutation.isLoading} type="submit" fullWidth variant="contained">
          Login
        </SubmitButton>
      </Form>

      <Para>
        <Link to="/reset-password">Forgot Password?</Link>
      </Para>
    </Card>
  );
};

export default Login;
