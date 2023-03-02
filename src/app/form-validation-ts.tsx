import {
  useForm,
  SubmitHandler,
  useController,
  UseControllerProps,
  useWatch,
  FormProvider,
  SubmitErrorHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  TextFieldProps,
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

export type Prompt = z.infer<typeof promptSchema>;

function Input(props: UseControllerProps<Prompt> & TextFieldProps) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController(props);

  const helperText = invalid ? error?.message : props.helperText;

  return (
    <TextField {...props} {...field} helperText={helperText} error={invalid} />
  );
}

function Checkbox(props: UseControllerProps<Prompt> & { label: string }) {
  const { field } = useController(props);

  return (
    <FormControlLabel control={<Switch {...field} />} label={props.label} />
  );
}

export function FormValidationTS() {
  const methods = useForm<Prompt>({
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
  } = methods;

  console.log('errors', errors);
  console.log('isValid', isValid);

  const onSubmit: SubmitHandler<Prompt> = (data) => {
    axios.post('/api/send', data).then((res) => {
      console.log(res.data);
    });
  };

  const onError: SubmitErrorHandler<Prompt> = (errors) => {
    console.log(errors);
  };

  return (
    <FormProvider {...methods}>
      <h1>Form Validation TypeScript + RHF</h1>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit, onError)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Input control={control} name="name" />
        <Input type="number" control={control} name="quantity" />
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
  const accept = useWatch<Prompt>({ name: 'accept' });

  return accept ? null : <Typography>You must accept the terms</Typography>;
}
