import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useAppDispatch } from '../hooks';
import { login } from '../redux/authSlice';

type BasicFormikTwoProps = {
  onSubmit: (values: { email: string; password: string }) => void;
};

export default function BasicFormikTwo({ onSubmit }: BasicFormikTwoProps) {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      onSubmit(values);
      dispatch(login(values));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        type="text"
        name="email"
        inputProps={{ 'aria-label': 'email' }}
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        type="text"
        name="password"
        inputProps={{ 'aria-label': 'password' }}
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
