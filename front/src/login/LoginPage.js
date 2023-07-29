// LoginPage.jsx
import React from 'react';
import './loginPage.css'; // CSS 파일을 import
import { useDispatch } from 'react-redux';
import { login } from '../store/isLoginSlice';
import axios from 'axios';
import { useState } from 'react';
import SignUp from './SignUp';
import FindId from './FindId';
import FindPassword from './FindPassword';
import { useSelector } from 'react-redux';

function LoginPage() {
    
    // 토큰 획득 방법은 localStorage.getItem("accessToken")

    const isConnected = useSelector(state => state.isConnected.value); // 현재 기기연결 상태 가져오기
    const isRegistered = useSelector(state => state.isRegistered.value); // 현재 식물등록 상태 가져오기
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch(); // action을 dispatch하는 함수 가져오기

    const handleIdChange = (e) => {
        setUserId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        loginRequest(userId, password);
    };

    const loginRequest = async (userid, password) => {
        await axios.post('serverloginurl', { userid: userid, password: password }, { "Content-Type": "application/json", withCredentials: true })
            .then((res) => {
                console.log("성공");
                if (res.data.data.accessToken) {  // 여기서 유저의 여러 정보에 대해서 알아와야 함 일단 닉네임, 키트 정보 정도는 가져와야 할듯
                    localStorage.setItem("accessToken", res.data.data.accessToken);  // 일단 localstorage에 => 쿠키 이동
                    // 여기에 기기연결 상태 확인후 dispatch
                    // 여기에 식물등록 상태 확인후 dispatch
                
                    dispatch(login());
                }
                return window.location.replace("/");  // 후에 확인 후 삭제해도 됨
            })
            .catch((error) => {
                console.log(error);
                alert("아이디와 비밀번호를 확인해 주세요.");
            });
        };


    return (
        <>
            <h2 className="login-title">Welcome House Farm</h2> {/* 새로운 요소인 h2 태그를 추가 */}
            <div className="center-container" style={{ display: 'flex', flexDirection: 'column' }}> {/* 새로운 CSS 클래스 추가 */}
                <div className="login-container"> {/* 새로운 CSS 클래스 추가 */}
                    <input type="text" placeholder="ID" className="input-field" value={ userId } onChange={ handleIdChange } />
                    <input type="password" placeholder="Password" className="input-field" value={ password } onChange={handlePasswordChange} />
                        <button type="button" className="login-button" style={{ width: '100%' }}  onClick={ () => dispatch(login()) }>로그인</button>
                </div>
                <div className='additional-container' style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between'  }}>
                    <FindId style={{ marginRight: '10px' }}></FindId>
                    <FindPassword style={{ marginRight: '10px' }}></FindPassword>
                    <SignUp></SignUp>
                </div>
            </div>
        </>
    );

}

export default LoginPage;
