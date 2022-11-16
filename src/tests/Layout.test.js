import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from '../components';
import '@testing-library/jest-dom/extend-expect';

describe('Layout', () => {
  test('Sidebar menu displays correctly when authed', () => {
    render(
      <Router>
        <Layout authProp={[true]} themeProp={[]} />
      </Router>
    );

    const sidebarRooms = screen.getByText('Rooms', { exact: true });
    expect(sidebarRooms).toBeInTheDocument();

    const sidebarUsers = screen.getByText('Users', { exact: true });
    expect(sidebarUsers).toBeInTheDocument();
  });

  test('Only displays Log in on sidebar when logged out', () => {
    render(
      <Router>
        <Layout authProp={[false]} themeProp={[]} />
      </Router>
    );

    const sidebarRooms = screen.queryByText('Rooms', { exact: true });
    expect(sidebarRooms).toBeNull();

    const sidebarLogin = screen.getByText('Log in', { exact: true });
    expect(sidebarLogin).toBeInTheDocument();
  });
});
