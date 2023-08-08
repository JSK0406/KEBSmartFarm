import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './navUpper.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFileLines, faSeedling, faDroplet, faUser, faBars, faGear } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import NavUserInfo from './NavUserInfo';
import NavContent from './NavContent';

function NavUpper() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }} >
            {/* offcanvas Part(userInfo) */}
            <NavUserInfo></NavUserInfo>

            {/* Navbar Part */}
            <Navbar
                className='col-11 col-lg-10'
                style={{ backgroundColor: '#5C9EAD', marginTop: '8px', borderRadius: '15px', display: 'flex', alignContent: 'center', fontSize: '15px', paddingRight: '20px' }}
                variant="dark"
                expand="lg"
            >
                <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }} >
                <Navbar.Brand className='nav-title' style={{ marginLeft: '20px' }}>Smart Home</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <NavContent link={'/home'} icon={'faHouse'} text={'Home'}></NavContent>
                        {/* <Nav.Link as={Link} to="/home" className="nav-link-item">
                            <div data-bs-toggle="collapse" data-bs-target="#basic-navbar-nav" aria-controls='basic-navbar-nav'>
                                <FontAwesomeIcon icon={faHouse} style={{ color: "#ffffff", paddingTop: '11px' }} /> Home
                            </div>
                        </Nav.Link> */}
                        <Nav.Link className="nav-link-item" as={Link} to="/intro"><FontAwesomeIcon icon={faFileLines} style={{ color: "#ffffff", paddingTop: '11px' }} /> Introduction</Nav.Link>
                        <Nav.Link className="nav-link-item" as={Link} to="/status"><FontAwesomeIcon icon={faSeedling} style={{ color: "#ffffff", paddingTop: '11px' }} /> Plant Status</Nav.Link>
                        <div data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                            <Nav.Link className="nav-link-item" style={{ marginLeft: '7px', color: 'ivory', fontWeight: '900', backgroundColor: 'none' }}>
                                {/* <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" style={{ border: 0, backgroundColor: 'transparent', margin: 0, }}><FontAwesomeIcon icon={faUser} style={{ color: "#ffffff", }} /> User Info</button> */}
                                <button className="btn" type="button" style={{ border: 0, backgroundColor: 'transparent', margin: 0, }}><FontAwesomeIcon icon={faUser} style={{ color: "#ffffff", }} /> User Info</button>
                            </Nav.Link>
                        </div>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown" style={{ display: 'none', marginRight: '10px' }}>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
};

export default NavUpper;