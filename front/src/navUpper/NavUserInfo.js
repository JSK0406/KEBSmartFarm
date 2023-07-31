import React from 'react'
import { Offcanvas } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logout } from '../store/isLoginSlice';
import { useCookies } from 'react-cookie';

function NavUserInfo() {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  
  const dispatch = useDispatch();

  const handleLogout = () => {
    removeCookie('accessToken');
    dispatch(logout())
  };

  return (
    <>
    < div className = "offcanvas offcanvas-end" tabindex = "-1" id = "offcanvasRight" aria-labelledby="offcanvasRightLabel" >
      <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">User Info</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
          <div>
              nickname
          </div>
          <div>
              {/* <button onClick={ () => dispatch(logout()) }>로그아웃</button> */}
              <button onClick={ handleLogout }>로그아웃</button>
          </div>
          <div>
              recent supply water date
          </div>
      </div>
      </div>
    </>
  )
};

export default NavUserInfo