import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './navUpper.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFileLines, faSeedling, faDroplet, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../store/isLoginSlice';
import { Link } from 'react-router-dom';

function NavUpper() {
    const dispatch = useDispatch(); // action을 dispatch하는 함수 가져오기
    return (
        <div>
            {/* offcanvas Part(userInfo) */}
            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">User Info</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div>
                        nickname
                    </div>
                    <div>
                        <button onClick={ () => dispatch(logout()) }>로그아웃</button>
                    </div>
                    <div>
                        recent supply water date
                    </div>
                </div>
            </div>

            {/* Navbar Part */}
            <Navbar
                style={{ margin: '15px', borderRadius: '15px', display: 'flex', alignContent: 'center' ,fontSize: '15px', paddingRight: '20px' }}
                bg="dark"
                variant="dark"
                expand="lg"
            >
                <Navbar.Brand className='nav-title' style={{ marginLeft: '20px' }}>Smart Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link as={Link} to="/home" className="nav-link-item"><FontAwesomeIcon icon={faHouse} style={{ color: "#ffffff", paddingTop: '11px' }} /> Home</Nav.Link>    
                        <Nav.Link className="nav-link-item" as={Link} to="/intro" ><FontAwesomeIcon icon={faFileLines} style={{ color: "#ffffff", paddingTop: '11px' }} /> Introduction</Nav.Link>
                        <Nav.Link className="nav-link-item" as={Link} to="/status"><FontAwesomeIcon icon={faSeedling} style={{ color: "#ffffff", paddingTop: '11px' }} /> Plant Status</Nav.Link>
                        <Nav.Link className="nav-link-item" as={Link} to="/guide"><FontAwesomeIcon icon={faDroplet} style={{ color: "#ffffff", paddingTop: '11px' }} /> Plant Guide</Nav.Link>
                        <Nav.Link className="nav-link-item" style={{ color: 'ivory', fontWeight: '900', backgroundColor: 'none' }}>
                            <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" style={{ border: 0, backgroundColor: 'transparent', margin: 0, fontSize: '12p' }}><FontAwesomeIcon icon={faUser} style={{ color: "#ffffff", }} /> User Info</button>
                        </Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown" style={{ display: 'none', marginRight: '10px' }}>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                    </Nav>
               </Navbar.Collapse>
            </Navbar>
        </div>
    )};

export default NavUpper;
