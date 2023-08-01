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
import { setCookie } from '../store/cookieSlice';
import { useCookies } from 'react-cookie';
import { refreshUserInfo } from '../store/userInfoSlice';
import { refreshUserId, refreshUserNickname } from '../store/userInfoSlice';
import Cookies from 'js-cookie';

export default function LoginPage() {
    
    // 토큰 획득 방법은 localStorage.getItem("accessToken")

    const isConnected = useSelector(state => state.isConnected.value); // 현재 기기연결 상태 가져오기
    const isRegistered = useSelector(state => state.isRegistered.value); // 현재 식물등록 상태 가져오기
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

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

    const accessToken = Cookies.get('accessToken');

    const loginRequest = async (userId, password) => {
        await axios.post('http://165.246.116.13:8080/auth/login', { userId: userId, userPassword: password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                console.log("성공");
                if (res.data.accessToken) {
                    axios.get('http://165.246.116.13:8080/users/me', {
                        headers: {
                            "Authorization": `Bearer ${res.data.accessToken}`
                        }
                    })
                        .then((res2) => {
                            console.log(" 패치 ")
                            console.log(res2.data.user.userId)
                            dispatch(refreshUserId(res2.data.user.userId))
                            console.log("실행1")
                            dispatch(refreshUserNickname(res2.data.user.userNickname))
                            console.log("실행2")
                            setCookie('accessToken', res.data.accessToken);
                            dispatch(login());
                        }).catch((error) => {
                            console.log(error)
                        });
                        
                }
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
                    <button type="button" className="login-button" style={{ width: '100%' }} onClick={() => handleLogin() }>로그인</button>
                    {/* <button type="button" className="login-button" style={{ width: '100%' }} onClick={() => dispatch(login()) }>로그인</button> */}
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