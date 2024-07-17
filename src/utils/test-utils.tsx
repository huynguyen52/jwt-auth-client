import { ThemeProvider } from '@mui/material';
import { RenderOptions, render } from '@testing-library/react';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme="light">{children}</ThemeProvider>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
