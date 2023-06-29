import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom';


function NavBar() {
  return (
    <Navbar className="navbar navbar-expand-lg bg-info d-none d-lg-flex noprint justify-content-between">
      <Container fluid>
        <Image src="https://img.freepik.com/free-vector/hand-drawn-flat-design-bookstore-logo_23-2149350212.jpg?w=740&t=st=1687537754~exp=1687538354~hmac=f059868349386c97949f5a512ed5c534b1df49c3f13dc242e8933b800f446ae5" width="120" height="80" className='mx-5' />
        <Navbar.Brand href="/"><h4><b>Home</b></h4></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-3 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className="me-auto mx-5 my-lg-0" href="/bookList"><h4><b>Explore Books</b></h4></Nav.Link>
            <Nav.Link className="me-auto mx-5 my-lg-0" href="/cart"><h4><b>Cart</b></h4></Nav.Link>
            <Nav.Link className="me-auto mx-5 my-lg-0" href="/order"><h4><b>Orders</b></h4></Nav.Link>
          </Nav>
          <Link to="/login">
            <Button variant="outline-light" className="me-auto mx-2 my-lg-0"  size="lg">
              Logout
            </Button>
          </Link>
             </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;