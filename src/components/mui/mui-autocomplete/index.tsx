import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material';

type MuiAutoCompleteProps = {
  label: string;
  options: { label: string; value: string }[];
  value: { label: string; value: string } | null;
  onChange: (value: { label: string; value: string } | null) => void;
  [key: string]: unknown;
};

export function MuiAutoComplete(props: MuiAutoCompleteProps) {
  const { label, options, value, onChange, ...rest } = props;
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Autocomplete
        isOptionEqualToValue={(option, value) => option.value === value.value}
        options={options}
        getOptionLabel={(option) => option.label}
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        renderInput={(params) => <TextField {...params} />}
        {...rest}
      />
    </FormControl>
  );
}
