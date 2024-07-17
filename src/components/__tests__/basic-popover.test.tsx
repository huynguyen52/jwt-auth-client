import { fireEvent, render, waitFor } from '@testing-library/react';
import BasicPopover from '../basic-popover';
import '@testing-library/jest-dom';

describe('BasicPopover Component', () => {
  test('should not display popover content initially', () => {
    const { queryByText } = render(<BasicPopover />);
    expect(queryByText(/The content of the Popover./i)).toBeNull();
  });

  test('should display popover content on button click', () => {
    const { getByText, queryByText } = render(<BasicPopover />);
    fireEvent.click(getByText(/Open Popover/i));
    expect(queryByText(/The content of the Popover./i)).toBeInTheDocument();
  });

  test('should hide popover content when closed', () => {
    const { getByText, queryByText } = render(<BasicPopover />);
    fireEvent.click(getByText(/Open Popover/i)); // Open the popover
    fireEvent.click(getByText(/Close/i)); // Simulate clicking outside to close
    waitFor(() => {
      expect(queryByText(/The content of the Popover./i)).toBeNull();
    });
  });
});
