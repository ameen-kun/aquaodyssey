// import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function CustomNavbar() {
  return (
    <Navbar expand="lg" variant='dark' className="bg-black">
    <Container>
      <Navbar.Brand><h1>AQUA ODYSSEY</h1></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mx-auto">
          <Nav.Link style={{backgroundColor:'white',color:'black'}} href="#link">Link</Nav.Link>
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#home">Home</Nav.Link>
      </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default CustomNavbar