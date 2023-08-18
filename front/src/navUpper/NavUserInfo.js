import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../store/isLoginSlice';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddDevice from '../homeContent/AddDevice';
import ChangePassword from './ChangePassword';

function NavUserInfo() {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const userNickname = useSelector(state => state.userInfo.value.infos.userNickname)
  const userKitList = useSelector(state => state.userInfo.value.infos.userKitList)

  const isRegistered = useSelector(state => state.isRegistered.value); // 현재 식물등록 상태 가져오기
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(useSelector(state => state.userInfo.value.infos))

  return (
    <>
      <div style={{ width: '300px' }} className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">User Info</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div>
            <div style={{ fontSize: '30px' }}>
              Welcome <br/>{userNickname}
            </div>
            <div style={{ fontSize: '20px' }}>
              Total kits you have : {userKitList.length}
            </div>
          </div>
          <div>
            <button type="button" className='btn' style={{
              color: 'white',
              backgroundColor: '#7AA278',
              paddingLeft: '7px',
              paddingRight: '7px',
              position: 'fixed',
              bottom: '5px',
              right: '5px', }} onClick={() => {
              removeCookie("accessToken")
              navigate("/login");
              window.location.reload();
            }}>logout</button>
          </div>

          <div>
            <ChangePassword></ChangePassword>
          </div>
          <div>
            recent supply water date
          </div>
        </div>
      </div>
    </>

  )
}

export default NavUserInfo