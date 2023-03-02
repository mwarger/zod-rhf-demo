import {
  useForm,
  useController,
  useWatch,
  FormProvider,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { z } from 'zod';
import axios from 'axios';

const promptSchema = z.object({
  name: z.string().min(3),
  quantity: z.coerce.number().min(1).max(10),
  accept: z
    .boolean()
    .refine((v) => v, { message: 'You must accept terms to continue.' }),
});

function Input(props) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController(props);

  const helperText = invalid ? error?.message : props.helperText;

  return (
    <TextField {...props} {...field} helperText={helperText} error={invalid} />
  );
}

function Checkbox(props) {
  const { field } = useController(props);

  return (
    <FormControlLabel control={<Switch {...field} />} label={props.label} />
  );
}

export function FormValidationJS() {
  const methods = useForm({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      name: '',
      quantity: 0,
      accept: false,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    register,
  } = methods;

  console.log('errors', errors);
  console.log('isValid', isValid);

  const onSubmit = (data) => {
    axios.post('/api/send', data).then((res) => {
      console.log(res.data);
    });
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <FormProvider {...methods}>
      <h1>Form Validation Javascript + RHF</h1>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit, onError)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Input name="name" />
        <Input type="number" name="quantity" />
        <Checkbox control={control} name="accept" label="Accept Terms" />
        <DisplayWarning />

        {errors.accept ? (
          <Typography>{errors.accept.message}</Typography>
        ) : null}
        <Button type="submit">Submit</Button>
      </Box>
    </FormProvider>
  );
}

function DisplayWarning() {
  const accept = useWatch({ name: 'accept' });

  return accept ? null : <Typography>Must accept</Typography>;
}
