// eslint-disable-next-line no-restricted-globals

import './App.css';
import LoginPage from './login/LoginPage';
import NavUpper from './navUpper/NavUpper';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeContent from './homeContent/HomeContent';
import IntroContent from './introContent/IntroContent';
import PlantStatusContent from './plantStatusContent/PlantStatusContent';
import GuideContent from './guideContent/GuideContent';
import { Navigate, Outlet } from 'react-router-dom';
import { fetchUser, refreshUserInfo } from './store/userInfoSlice';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import SearchContent from './searchContent/SearchContent';

const checkLogin = () => {
  if (Cookies.get("accessToken")) {
    return true
  } else {
    return false
  }
}

function App() {
  
  const dispatch = useDispatch()
  let isLogin = '';
  const isToken = checkLogin();
  
  if (isToken) {
    dispatch(fetchUser());
    isLogin = true;
  } else {
    isLogin = false;
  }

  useEffect(() => {
    const intervalCheck = setInterval(() => {
      if (isLogin && !checkLogin()) { window.location.reload(); }
    }, 10000);

    return () => clearInterval(intervalCheck)
  }, []);

  return (
    <div className='App col-12 col-lg-10' style={{ margin: '0 auto' }}>
      <Router>
        {isLogin && <NavUpper />}
        <Routes>
          <Route path="/home" element={isLogin ? <HomeContent /> : < LoginPage />}/>
          <Route path="/intro" element={isLogin ? <IntroContent /> : < LoginPage />} />
          <Route path="/search" element={isLogin ? <SearchContent /> : < LoginPage />} />
          <Route path="/status" element={isLogin ? <PlantStatusContent /> : < LoginPage />} />
          <Route path="/guide" element={isLogin ? <GuideContent /> : < LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/home" />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;