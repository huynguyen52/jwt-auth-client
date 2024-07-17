import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

export default function BasicFormik() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
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
        type="password"
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
