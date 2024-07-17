// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

declare global {
  interface Window {
    VERSION: string;
  }
}

window.URL.createObjectURL = (): string => '';

window.VERSION = '1.0.0';
