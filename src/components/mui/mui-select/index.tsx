import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';

import { SelectChangeEvent } from '@mui/material';

type MuiSelectProps<T> = {
  name: string;
  value: string;
  onChange: (e: SelectChangeEvent<string>, child: React.ReactNode) => void;
  options: T[];
  error?: string;
};

export function MuiSelect<T extends { id: string; title: string }>(
  props: MuiSelectProps<T>,
) {
  const { name, value, onChange, options, error = null } = props;

  return (
    <FormControl variant="outlined" {...(error && { error: true })}>
      <Select
        inputProps={{ 'aria-label': name }}
        name={name}
        value={value}
        onChange={onChange}
      >
        <MenuItem value="">None</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id} aria-label={option.title}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
