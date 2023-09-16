import { useEffect } from 'react';
import { Button, CircularProgress, TextField, styled } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType, object, string } from 'yup';
import { useMutation } from '@tanstack/react-query';
import collectionServices from '@service/collectionServices';
import { RequestError } from '@service/index';
import Toaster from '@component/toaster';

const schema = object({
  name: string()
    .trim('collection name must not start or end with empty space')
    .min(3, 'collection name must be at least 3 characters')
    .required('collection name is required')
    .matches(/^[aA-zZ\s]+$/, 'collection name must be alphabet only'),
  projectId: string().trim().default(''),
});
type FormData = InferType<typeof schema>;

type AddCollectionProps = {
  project: string;
  handleNext: (name: string) => void;
};

const AddCollection = ({ project, handleNext }: AddCollectionProps) => {
  const { control, handleSubmit, setError, formState, getValues } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  const { isLoading, isSuccess, isError, error, mutate } = useMutation<unknown, RequestError, FormData>({
    mutationKey: ['validate_collection'],
    mutationFn: (data) => collectionServices.validateCollection(data.projectId, data.name),
  });

  const onSubmit = (data: FormData) => mutate({ ...data, projectId: project });

  useEffect(() => {
    if (isError) {
      const errorMessage = error?.response?.data?.errors;
      if (typeof errorMessage === 'object') {
        setError('name', { message: errorMessage?.name });
      }
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) handleNext(getValues('name'));
  }, [isSuccess]);

  return (
    <>
      <Toaster type="error" message="Something went wrong" show={isError} />
      <Form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Controller
          name="name"
          control={control}
          render={({ field: { value, ...field } }) => (
            <TextField
              size="small"
              sx={{ mb: '24px' }}
              fullWidth
              id="collection-name"
              variant="outlined"
              placeholder="Collection name"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...field}
            />
          )}
        />

        <NextButton disabled={isLoading} variant="contained" type="submit" size="large">
          {isLoading ? <CircularProgress color="secondary" size={20} /> : 'Next'}
        </NextButton>
      </Form>
    </>
  );
};

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});

const NextButton = styled(Button)({
  textTransform: 'capitalize',
  marginTop: '50px',
  marginLeft: 'auto',
});

export default AddCollection;
