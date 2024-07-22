import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MuiSelect } from '../mui';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

export function BasicFormik() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      selectOne: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const selectOneOptions = [
    { id: '1', title: 'Option 1' },
    { id: '2', title: 'Option 2' },
  ];

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      onSubmit={formik.handleSubmit}
    >
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
      <MuiSelect
        name="selectOne"
        value={formik.values.selectOne}
        onChange={formik.handleChange}
        options={selectOneOptions}
      />
      <Button type="submit">Submit</Button>
    </Box>
  );
}
