import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../resources/images/reddit_header.svg';

function Header(props) {

  return (
    <>
      <Navbar bg={props.theme.themeValue} variant="dark" expand={true}>
        <Container>
          <Navbar.Brand>
            <img
            alt="Reddit Logo"
            src={logo}
            width="80"
            height="80"
            className="d-inline-block align-top"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;