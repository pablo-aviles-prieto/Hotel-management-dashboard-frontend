import { render } from '@testing-library/react';
import { ButtonTest } from '../components/Styles/ButtonTest';
import { LIGHT_THEME, DARK_THEME } from '../themes';
import { ThemeProvider } from 'styled-components';
import '@testing-library/jest-dom/extend-expect';

describe('Button', () => {
  test('renders correctly the props passed', () => {
    const paddingTest = '10px 15px';
    const colorTest = 'red';
    render(
      <div>
        <ButtonTest color={colorTest} pad={paddingTest} />
      </div>
    );
    const props = {
      children: '',
      color: colorTest,
      pad: paddingTest,
    };
    const btnClass = ButtonTest(props).type.styledComponentId;
    // eslint-disable-next-line testing-library/no-node-access
    const btnElements = document.getElementsByClassName(btnClass);
    const style = window.getComputedStyle(btnElements[0]);
    expect(style.borderRadius).toBe('14px');
    expect(style.color).toBe(colorTest);
    expect(style.padding).toBe(paddingTest);
  });

  test('renders black bground when light theme', () => {
    const paddingTest = '10px 15px';
    const colorTest = 'red';
    render(
      <ThemeProvider theme={LIGHT_THEME}>
        <div>
          <ButtonTest color={colorTest} pad={paddingTest} />
        </div>
      </ThemeProvider>
    );
    const props = {
      children: '',
    };
    const btnClass = ButtonTest(props).type.styledComponentId;
    // eslint-disable-next-line testing-library/no-node-access
    const btnElements = document.getElementsByClassName(btnClass);
    const style = window.getComputedStyle(btnElements[0]);
    // rgb(33, 33, 33) = #212121, color used in theme for light mode
    expect(style.backgroundColor).toBe('rgb(33, 33, 33)');
  });

  test('renders white bground when dark theme', () => {
    const paddingTest = '10px 15px';
    const colorTest = 'red';
    render(
      <ThemeProvider theme={DARK_THEME}>
        <div>
          <ButtonTest color={colorTest} pad={paddingTest} />
        </div>
      </ThemeProvider>
    );
    const props = {
      children: '',
    };
    const btnClass = ButtonTest(props).type.styledComponentId;
    // eslint-disable-next-line testing-library/no-node-access
    const btnElements = document.getElementsByClassName(btnClass);
    const style = window.getComputedStyle(btnElements[0]);
    // rgb(232, 242, 239) = #E8F2EF, color used in theme for dark mode
    expect(style.backgroundColor).toBe('rgb(232, 242, 239)');
  });
});
