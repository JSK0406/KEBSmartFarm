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

function App() {

  const isLogin = useSelector(state => state.isLogin.value); // 현재 로그인 상태 가져오기
  
  // 한 컴포넌트는 75vh정도 
  return (
    isLogin ?
    (
    <div>
      <Router>
        <NavUpper />
          <Routes>
              <Route path="/home" element={<HomeContent />} />
              <Route path="/intro" element={<IntroContent />} />
              <Route path="/status" element={<PlantStatusContent />} />
              <Route path="/guide" element={<GuideContent />} />
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