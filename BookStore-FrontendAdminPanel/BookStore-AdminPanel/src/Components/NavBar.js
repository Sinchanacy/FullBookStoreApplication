import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';


function NavBar() {
  return (
    <Navbar className="navbar navbar-expand-lg bg-info d-none d-lg-flex noprint justify-content-between">
      <Container fluid>
        <Image src="https://d3fufwrs5ttbo7.cloudfront.net/layout-media/logo-eform.svg" className='mx-5' />
        <Navbar.Brand href="/"><b>Home</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-3 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className="me-auto mx-5 my-lg-0" href="#action1"><b>Owner Operators</b></Nav.Link>
            <Nav.Link className="me-auto mx-5 my-lg-0" href="#action1"><b>Fleet Operators</b></Nav.Link>
            <Nav.Link className="me-auto mx-5 my-lg-0" href="#action1"><b>Tax Proffesionals</b></Nav.Link>
            <b><NavDropdown className="me-auto mx-5 my-lg-0"  title="Support" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action">Instructions</NavDropdown.Item>
              <NavDropdown.Item href="#action">
               FAQs
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action">
                Contact Us
              </NavDropdown.Item>
            </NavDropdown></b>
          </Nav>
          <Link to="/login">
            <Button variant="outline-light" size="lg">
              Login
            </Button>
          </Link>
            <Image src="https://d3fufwrs5ttbo7.cloudfront.net/layout-media/irs-logo.png" className='mx-5' />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;