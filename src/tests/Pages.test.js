import { render, screen } from '@testing-library/react';
import HomePage from '../pages/Homepage';
import RoomsList from '../pages/RoomsList';
import '@testing-library/jest-dom/extend-expect';

describe('Homepage', () => {
  test('renders calendar section', () => {
    render(<HomePage />);

    const calendar = screen.getByText('Calendar', { exact: true });
    expect(calendar).toBeInTheDocument();
  });
});

describe('Rooms', () => {
  test('renders the rooms navigation bar', () => {
    render(<RoomsList />);

    const rooms = screen.getByText('All Rooms', { exact: true });
    expect(rooms).toBeInTheDocument();
  });
});
