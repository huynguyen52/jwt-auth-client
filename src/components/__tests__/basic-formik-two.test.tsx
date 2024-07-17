import { render, fireEvent, waitFor, act } from '@testing-library/react';
import BasicFormikTwo from '../basic-formik-two';
import '@testing-library/jest-dom';

const onSubmit = jest.fn();

describe('BasicFormikTwo Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<BasicFormikTwo onSubmit={onSubmit} />);
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('allows form submission with correct values', async () => {
    const { getByText, getByRole } = render(
      <BasicFormikTwo onSubmit={onSubmit} />,
    );
    act(() => {
      fireEvent.change(getByRole('textbox', { name: 'email' }), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(getByRole('textbox', { name: 'password' }), {
        target: { value: 'password123' },
      });
      fireEvent.click(getByText('Submit'));
    });

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
