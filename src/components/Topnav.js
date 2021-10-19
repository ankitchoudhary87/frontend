import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap'
function Topnav(props) {
  const storedData = JSON.parse(localStorage.getItem("MyUser"));
  return (
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#fff', boxShadow:'0px 1px 4px rgb(131 131 131 / 16%)' }} fixed="top">
      <Container>
        <img src="http://att.synapseindia.com/images/logo.png" alt="Logo" />

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          {storedData ?
            <Nav>
              <Nav.Link style={{ fontWeight: '500' }}>Welcome, {props.loggedinuser.name}</Nav.Link>
              <Nav.Link onClick={() => { props.logout() }} className="logoutbutton">Logout &nbsp;&nbsp;&nbsp;&nbsp;</Nav.Link>
            </Nav> : ""
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default Topnav