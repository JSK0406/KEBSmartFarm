import React from 'react'
import { Offcanvas } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logout } from '../store/isLoginSlice';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function NavUserInfo() {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const userNickname = useSelector(state => state.userInfo.value.infos.userNickname)
  const userKitList = useSelector(state => state.userInfo.value.infos.userKitList)
  console.log(userNickname)

  const isRegistered = useSelector(state => state.isRegistered.value); // 현재 식물등록 상태 가져오기
  const dispatch = useDispatch();


  console.log("렌더링")

  // useEffect(() => {
  //   console.log("바뀜")
  // }, [userNickname])

  return (
    <>
      < div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">User Info</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div>
            { userNickname }님 안녕하세요!
            {console.log(userKitList)}
            {userKitList.map((kit, index) => (
              <div key={index}>
                <p>Kit No: {kit.kitNo}</p>
                <p>Device Name: {kit.deviceName}</p>
                <p>Serial Number: {kit.serialNum}</p>
                <p>Date: {kit.date}</p>
              </div>
            ))}
          </div>
          <div>    
            {/* { userKits } */}
          <div/>
          </div>
          <div>
            <button onClick={ () => {
              removeCookie("accessToken")
              dispatch(logout())
              }}>로그아웃</button>
            {/* <button onClick={handleLogout}>로그아웃</button> */}
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