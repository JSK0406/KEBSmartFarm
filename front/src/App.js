import './App.css';
import LoginPage from './login/LoginPage';
import NavUpper from './navUpper/NavUpper';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';
import HomeContent from './homeContent/HomeContent';
import IntroContent from './introContent/IntroContent';
import PlantStatusContent from './plantStatusContent/PlantStatusContent';
import GuideContent from './guideContent/GuideContent';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ModifyInfo from './modifyInfo/ModifyInfo';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { refreshUserInfo } from './store/userInfoSlice';

function App() {

  const isLogin = useSelector(state => state.isLogin.value); // 현재 로그인 상태 가져오기
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken'])


  const dispatch = useDispatch();

  
  // 한 컴포넌트는 75vh정도 
  return (
    // (cookies.accessToken) ?
    (isLogin) ?
    (
    <div>
      <Router>
        <NavUpper />
          <Routes>
              <Route path="/home" element={<HomeContent />} />
              <Route path="/intro" element={<IntroContent />} />
              <Route path="/status" element={<PlantStatusContent />} />
              <Route path="/guide" element={<GuideContent />} />
              <Route path="/modify" element={<ModifyInfo/>} />
              <Route path="*" element={<Navigate to="/home" replace />}></Route>
          </Routes>
      </Router>
    </div>
    ) 
    : 
    <LoginPage/>
  );
}

export default App;