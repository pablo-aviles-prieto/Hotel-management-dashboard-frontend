import { render, screen } from '@testing-library/react';
import Bookings from '../../pages/Bookings';
import { Layout } from '../Layout/Layout';
import { ButtonTest } from './ButtonTest';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

describe('Homepage', () => {
  test('renders calendar section', () => {
    const paddingTest = '10px 15px';
    const colorTest = 'red';
    render(
      <div>
        <Router>
          <Layout authProp={[]} themeProp={[]}>
            <ButtonTest color={colorTest} pad={paddingTest} />
          </Layout>
        </Router>
      </div>
    );
    const props = { children: '' };
    const btnClass = ButtonTest(props).type.styledComponentId;
    // eslint-disable-next-line testing-library/no-node-access
    const btnElements = document.getElementsByClassName(btnClass);
    // console.log('btnClass', btnClass);
    // console.log('btnElements', btnElements[0]);
    const style = window.getComputedStyle(btnElements[0]);
    // console.log('style', btnElements[0]);
    expect(style.borderRadius).toBe('14px');
    expect(style.color).toBe(colorTest);
    expect(style.padding).toBe(paddingTest);
  });
});
