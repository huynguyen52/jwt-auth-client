import { fireEvent, waitFor, act } from '@testing-library/react';
import BasicFormikTwo from '../basic-formik-two';
import '@testing-library/jest-dom';
import { mockStore, render } from '../../utils/test-utils';
import { login } from '../../redux/authSlice';

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

  it('updates redux store on form submission', async () => {
    const store = mockStore({
      auth: { user: null },
    });
    const { getByText, getByRole } = render(
      <BasicFormikTwo onSubmit={onSubmit} />,
      store,
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
      // Check if the onSubmit callback was called
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      // Check if the login action was dispatched to the store
      const actions = store.getActions();
      const expectedPayload = {
        type: login.type,
        payload: { email: 'test@example.com', password: 'password123' },
      };
      expect(actions).toContainEqual(expectedPayload);
    });
  });
});
