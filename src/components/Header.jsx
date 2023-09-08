import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
function Header() {
  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand href='/'>First App</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/' active>
              Home
            </Nav.Link>
            <Nav.Link href='/'>Manage Users</Nav.Link>
            <NavDropdown title='Setting' id='basic-nav-dropdown'>
              <NavDropdown.Item href='/login'>Login</NavDropdown.Item>
              <NavDropdown.Item href='/logout'>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
