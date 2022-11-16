import { render, screen } from '@testing-library/react';
import HomePage from './Homepage';
import '@testing-library/jest-dom/extend-expect';

describe('Homepage', () => {
  test('renders calendar section', () => {
    render(<HomePage />);

    const calendar = screen.getByText('Calendar', { exact: true });
    expect(calendar).toBeInTheDocument();
  });
});
