import { render, fireEvent, waitFor, act } from '@testing-library/react';
import BasicFormik from '../basic-formik';
import '@testing-library/jest-dom';

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
});
