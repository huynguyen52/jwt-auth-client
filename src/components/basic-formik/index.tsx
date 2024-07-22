import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MuiAutoComplete, MuiSelect } from '../mui';

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
      autocomplete: null,
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

  const selectTwoOptions = [
    { label: 'Option 3', value: '1' },
    { label: 'Option 4', value: '2' },
    { label: 'Option 5', value: '3' },
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
        autoComplete="email"
        inputProps={{ 'aria-label': 'email' }}
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        autoComplete="current-password"
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
      <MuiAutoComplete
        label="Autocomplete"
        name="autocomplete"
        options={selectTwoOptions}
        value={formik.values.autocomplete}
        onChange={(value) => formik.setFieldValue('autocomplete', value)}
      />
      <Button type="submit">Submit</Button>
    </Box>
  );
}
