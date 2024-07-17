import { ThemeProvider, createTheme } from '@mui/material';
import { RenderOptions, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { AppDispatch, RootState } from '../store';

export const mockStore = createMockStore<RootState, AppDispatch>();

const mockRootState: RootState = {
  auth: { user: null },
};

const AllTheProviders = ({
  children,
  store = mockStore(mockRootState),
}: {
  children: React.ReactNode;
  store?: ReturnType<typeof mockStore>;
}) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={createTheme()}>{children}</ThemeProvider>
    </Provider>
  );
};

const customRender = (
  ui: React.ReactElement,
  store?: ReturnType<typeof mockStore>,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <AllTheProviders store={store}>{children}</AllTheProviders>;
  };
  return render(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';
export { customRender as render };
