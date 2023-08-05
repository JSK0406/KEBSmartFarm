// eslint-disable-next-line no-restricted-globals

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
import ModifyInfo from './modifyInfo/ModifyInfo';
import { fetchUser, refreshUserInfo } from './store/userInfoSlice';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { login, logout } from './store/isLoginSlice';

function App() {

  const dispatch = useDispatch()
  const isLogin = useSelector(state => state.isLogin.value);


  useEffect(() => {
    if (Cookies.get("accessToken")) {
      dispatch(fetchUser());  
      dispatch(login());
    } else {
      dispatch(logout()); 
    }
  })

  return (
    <div className='App' style={{ width: '81%', margin: '0 auto' }}>
      <Router>
        {isLogin && <NavUpper />}
        <Routes>
          <Route path="/home" element={isLogin ? <HomeContent /> : < LoginPage />}/>
          <Route path="/intro" element={isLogin ? <IntroContent /> : < LoginPage />} />
          <Route path="/status" element={isLogin ? <PlantStatusContent /> : < LoginPage />} />
          <Route path="/guide" element={isLogin ? <GuideContent /> : < LoginPage />} />
          <Route path="/modify" element={isLogin ? <ModifyInfo /> : < LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/home" />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;