import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './navUpper.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFileLines, faSeedling, faDroplet, faUser, faBars, faGear } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import NavUserInfo from './NavUserInfo';

function NavUpper() {
    return (
        // <div style={{ marginLeft: '3.8%', marginRight: '3.8%' }}>
        <div>
            {/* offcanvas Part(userInfo) */}
            <NavUserInfo></NavUserInfo>

            {/* Navbar Part */}
            <Navbar
                className='col-9 col-lg-10'
                style={{ backgroundColor: '#5C9EAD', margin: '8px 80px 0px 80px  ', borderRadius: '15px', display: 'flex', alignContent: 'center', fontSize: '15px', paddingRight: '20px' }}
                // bg="dark"
                variant="dark"
                expand="lg"
            >
                <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }} >
                <Navbar.Brand className='nav-title' style={{ marginLeft: '20px' }}>Smart Home</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link as={Link} to="/home" className="nav-link-item"><FontAwesomeIcon icon={faHouse} style={{ color: "#ffffff", paddingTop: '11px' }} /> Home</Nav.Link>
                        <Nav.Link className="nav-link-item" as={Link} to="/intro" ><FontAwesomeIcon icon={faFileLines} style={{ color: "#ffffff", paddingTop: '11px' }} /> Introduction</Nav.Link>
                        <Nav.Link className="nav-link-item" as={Link} to="/status"><FontAwesomeIcon icon={faSeedling} style={{ color: "#ffffff", paddingTop: '11px' }} /> Plant Status</Nav.Link>
                        <Nav.Link className="nav-link-item" as={Link} to="/guide"><FontAwesomeIcon icon={faDroplet} style={{ color: "#ffffff", paddingTop: '11px' }} /> Plant Guide</Nav.Link>
                        <Nav.Link className="nav-link-item" as={Link} to="/modify"><FontAwesomeIcon icon={faGear} style={{ color: "#ffffff", paddingTop: '11px' }} /> Edit Info</Nav.Link>
                        <div data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                            <Nav.Link className="nav-link-item" style={{ marginLeft: '7px', color: 'ivory', fontWeight: '900', backgroundColor: 'none' }}>
                                <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" style={{ border: 0, backgroundColor: 'transparent', margin: 0, }}><FontAwesomeIcon icon={faUser} style={{ color: "#ffffff", }} /> User Info</button>
                            </Nav.Link>
                        </div>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown" style={{ display: 'none', marginRight: '10px' }}>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
};

export default NavUpper;