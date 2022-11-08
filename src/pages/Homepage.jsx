import { Button } from '../components/Styles';

const Homepage = ({ onThemeChange }) => {
  return (
    <>
      <h1>Home page</h1>
      <Button onClick={() => onThemeChange()}>Change theme</Button>
    </>
  );
};

export default Homepage;
