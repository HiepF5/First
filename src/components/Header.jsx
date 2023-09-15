import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { NavLink } from 'react-router-dom'
import vite from '../assets/vite.svg'
function Header() {
  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand>
          <img src={vite} style={{ height: '1.25rem' }} />
          First App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <NavLink to='/home' className='nav-link'>
              Home
            </NavLink>
            <NavLink to='/users' className='nav-link'>
              Manage Users
            </NavLink>
          </Nav>
          <Nav>
            <NavDropdown title='Setting' id='basic-nav-dropdown' className=''>
              <NavDropdown.Item as={NavLink} to='/login'>
                Login
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/logout'>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
