import { Box, Button, IconButton, MenuItem, Select, TextField, styled } from '@mui/material';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, InferType, object, string, mixed, number, boolean } from 'yup';
import { MinusCircle, Plus } from 'lucide-react';

const fieldTypes = ['string', 'number', 'boolean'];

const fieldSchema = object({
  fields: array()
    .of(
      object({
        field: string()
          .trim('Field must not start or end with empty space')
          .min(3, 'Field must be at least 3 characters')
          .required('Field is required')
          .matches(/^[aA-zZ\s]+$/, 'Field must be alphabet only'),
        type: string().oneOf(fieldTypes).required('Data type is required'),
        value: mixed()
          .required('Value is required')
          .when('type', (type) => {
            if (type[0] === 'string') return string().typeError('must be a string').required('Value is required');
            if (type[0] === 'number') return number().typeError('must be a number').required('Value is required');
            if (type[0] === 'boolean') return boolean().typeError('must be a boolean').required('Value is required');
            return string().typeError('must be a string').required('Value is required');
          }),
      }),
    )
    .required(),
});

type Fields = InferType<typeof fieldSchema>;

const AddField = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>({
    defaultValues: { fields: [{ field: '', type: 'string', value: '' }] },
    resolver: yupResolver(fieldSchema),
  });
  const { fields, append, remove } = useFieldArray({
    name: 'fields',
    control,
  });

  const addNewField = () => append({ field: '', type: 'string', value: '' });
  const removeField = (index: number) => remove(index);

  const onSubmit = (data: Fields) => console.log(data);

  return (
    <FieldContainer>
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        {fields.map((field, index) => (
          <FieldWrapper key={field.id}>
            <Controller
              name={`fields.${index}.field`}
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  size="small"
                  placeholder="Field"
                  variant="outlined"
                  error={errors.fields && !!errors.fields[index]?.field}
                  helperText={errors.fields && errors.fields[index]?.field?.message}
                />
              )}
            />
            <Controller
              name={`fields.${index}.type`}
              control={control}
              render={({ field }) => (
                <SelectForm
                  {...field}
                  sx={{ mx: '12px' }}
                  placeholder="Data type"
                  size="small"
                  error={errors.fields && !!errors.fields[index]?.type}
                >
                  {fieldTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </SelectForm>
              )}
            />
            <Controller
              name={`fields.${index}.value`}
              control={control}
              render={({ field: { value, ...field } }) => (
                <InputField
                  {...field}
                  size="small"
                  placeholder="Value"
                  variant="outlined"
                  error={errors.fields && !!errors.fields[index]?.value}
                  helperText={errors.fields && errors.fields[index]?.value?.message}
                />
              )}
            />
            <IconButton onClick={() => removeField(index)}>
              <MinusCircle size={20} />
            </IconButton>
          </FieldWrapper>
        ))}

        <BTN onClick={addNewField}>
          <Plus size={20} style={{ marginRight: '8px' }} />
          Add field
        </BTN>

        <Buttons>
          <BTN>Cancel</BTN>
          <BTN disabled={!fields.length} sx={{ ml: '16px' }} type="submit" variant="contained">
            Continue
          </BTN>
        </Buttons>
      </form>
    </FieldContainer>
  );
};

const FieldContainer = styled(Box)({});

const FieldWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: '16px',
});

const SelectForm = styled(Select)({});

const InputField = styled(TextField)({});

const BTN = styled(Button)({
  textTransform: 'capitalize',
});

const Buttons = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginTop: '35px',
});

export default AddField;
