import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { BasicFormik } from '..';

describe('BasicFormik Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<BasicFormik />);
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('validates email field correctly', async () => {
    const { getByText, getByRole, getAllByText } = render(<BasicFormik />);
    act(() => {
      fireEvent.change(getByRole('textbox', { name: 'email' }), {
        target: { value: '' },
      });
      fireEvent.click(getByText('Submit'));
    });

    await waitFor(() => {
      expect(getAllByText('Required')).toHaveLength(2);
    });

    act(() => {
      fireEvent.change(getByRole('textbox', { name: 'email' }), {
        target: { value: 'invalid' },
      });
      fireEvent.click(getByText('Submit'));
    });

    await waitFor(() => {
      expect(getByText('Invalid email address')).toBeInTheDocument();
    });
  });

  it('validates password field correctly', async () => {
    const { getByText, getByRole } = render(<BasicFormik />);
    act(() => {
      fireEvent.change(getByRole('textbox', { name: 'email' }), {
        target: { value: 'example@mail.com' },
      });
      fireEvent.click(getByText('Submit'));
    });

    await waitFor(() => {
      expect(getByText('Required')).toBeInTheDocument();
    });
  });
  it('updates formik values when an option is selected in MuiSelect', async () => {
    const { getByText, getAllByRole } = render(<BasicFormik />);
    // Simulate selecting an option in MuiSelect
    const selectButton = screen.getByRole('combobox', { name: 'selectOne' });
    fireEvent.mouseDown(selectButton);
    await act(async () => {
      const option = getAllByRole('option');
      fireEvent.click(option[0]);
    });

    // Assert that the formik values have been updated
    const selectInput = getByText('Option 1');
    expect(selectInput).toBeInTheDocument();
  });
  it('updates formik values when an option is selected in MuiAutoComplete', async () => {
    const { getAllByRole } = render(<BasicFormik />);
    // Open the autocomplete dropdown
    fireEvent.mouseDown(getAllByRole('combobox')[1]);
    await act(async () => {
      // Select the first option from the autocomplete dropdown
      const option = getAllByRole('option');
      fireEvent.click(option[0]);
    });

    await waitFor(() => {
      // Assert that the formik values have been updated
      const autocompleteInput = getAllByRole('combobox')[1] as HTMLInputElement;
      expect(autocompleteInput.value).toBe('Option 3');
    });
  });
});
