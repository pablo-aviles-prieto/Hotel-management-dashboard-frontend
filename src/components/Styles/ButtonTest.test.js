import { render, screen } from '@testing-library/react';
import Bookings from '../../pages/Bookings';
import { ButtonTest } from './ButtonTest';
import '@testing-library/jest-dom/extend-expect';

describe('Homepage', () => {
  test('renders calendar section', () => {
    const paddingTest = '10px 15px';
    const colorTest = 'red';
    render(
      <div>
        <ButtonTest color={colorTest} pad={paddingTest} />
      </div>
    );
    const props = { children: '' };
    const btnClass = ButtonTest(props).type.styledComponentId;
    // eslint-disable-next-line testing-library/no-node-access
    const btnElements = document.getElementsByClassName(btnClass);
    // console.log('btnClass', btnClass);
    // console.log('btnElements', btnElements[0]);
    const style = window.getComputedStyle(btnElements[0]);
    expect(style.borderRadius).toBe('14px');
    expect(style.color).toBe(colorTest);
    expect(style.padding).toBe(paddingTest);
  });
});
