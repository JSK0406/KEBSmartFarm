import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './navUpper.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFileLines, faSeedling, faDroplet, faUser, faBars, faGear, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import NavUserInfo from './NavUserInfo';
import icon from './icon.png';
import { PiPottedPlantDuotone } from 'react-icons/pi';

// import NavContent from './NavContent';

function NavUpper() {
    return (
        <div style={{ color: '#291528', margin: '6px 12px', display: 'flex', justifyContent: 'center' }} >
            {/* offcanvas Part(userInfo) */}
            <NavUserInfo></NavUserInfo>

            {/* Navbar Part */}
            <Navbar
                className='col-11 col-lg-10'
                style={{ backgroundColor: '#EEEEFF', marginTop: '8px', borderRadius: '15px', display: 'flex', alignContent: 'center', fontSize: '16px', paddingRight: '20px' }}
                expand="lg"
            >
            {/* <Navbar
                className='col-11 col-lg-10'
                style={{ backgroundColor: '#5C9EAD', marginTop: '8px', borderRadius: '15px', display: 'flex', alignContent: 'center', fontSize: '15px', paddingRight: '20px' }}
                variant="dark"
                expand="lg"
            > */}
                <Link to="/home" style={{ color: '#291528', textDecoration: 'none' }} >
                    <Navbar.Brand className='nav-title' style={{ color: '#291528', marginLeft: '20px' }}>  
                <img  style={{ width: '50px' }} src={icon} />
                {/* Smart Home */}
                </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav style={{ color: '#291528' }}>
                        <Nav.Link as={Link} to="/home" className="nav-link-item">
                            {/* <div data-bs-toggle="collapse" data-bs-target="#basic-navbar-nav" aria-controls='basic-navbar-nav'> */}
                            <FontAwesomeIcon icon={faHouse} style={{ color: '#291528', paddingTop: '11px' }} /> Home
                            {/* </div> */}
                        </Nav.Link>
                        <Nav.Link className="nav-link-item" as={Link} to="/intro"><FontAwesomeIcon icon={faFileLines} style={{ color: '#291528', paddingTop: '11px' }} /> Introduction</Nav.Link>
                        <Nav.Link className="nav-link-item" as={Link} to="/search"><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: '#291528', paddingTop: '11px' }} /> Plant Search</Nav.Link>
                        <Nav.Link className="nav-link-item" as={Link} to="/status"><FontAwesomeIcon icon={faSeedling} style={{ color: '#291528', paddingTop: '11px' }} /> Plant Status</Nav.Link>
                        <div data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                            <Nav.Link className="nav-link-item" style={{ marginLeft: '7px', color: 'ivory', fontWeight: '900', backgroundColor: 'none' }}>
                                {/* <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" style={{ border: 0, backgroundColor: 'transparent', margin: 0, }}><FontAwesomeIcon icon={faUser} style={{ color: "#ffffff", }} /> User Info</button> */}
                                <button className="btn" type="button" style={{ color: 'white', border: 0, backgroundColor: 'transparent', margin: 0, color: '#291528' }}><FontAwesomeIcon icon={faUser} style={{ color: '#291528', }} /> User Info</button>
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