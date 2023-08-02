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
import { refreshUserInfo } from './store/userInfoSlice';
import Cookies from 'js-cookie';

function App() {


  const isLogin = useSelector(state => state.isLogin.value); // 현재 로그인 상태 가져오기
  
  // 한 컴포넌트는 75vh정도 
  return (
    // (Cookies.get("accessToken")) ?
    // {console.log(Cookies.get("accessToken"))}
    // (getCookie("accessToken")) ?
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
              {/* <Route path="*" element={<Navigate to="/home" replace />}></Route> */}
              <Route path="*" element={<Navigate to="/home"/>}></Route>
          </Routes>
      </Router>
    </div>
    ) 
    : 
    <LoginPage/>
  );
}

export default App;