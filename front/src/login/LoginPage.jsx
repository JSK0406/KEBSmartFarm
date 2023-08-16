// LoginPage.jsx
import React, { useEffect } from 'react';
import './loginPage.css'; // CSS 파일을 import
import { useDispatch } from 'react-redux';
import { login } from '../store/isLoginSlice';
import axios from 'axios';
import { useState, useRef } from 'react';
import SignUp from './SignUp';
import FindId from './FindId';
import FindPassword from './FindPassword';
import { useCookies } from 'react-cookie';
import { refreshUserId, refreshUserNickname, refreshUserKitList } from '../store/userInfoSlice';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const Server_IP = process.env.REACT_APP_Server_IP;
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    const foucsRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch(); // action을 dispatch하는 함수 가져오기
    
    useEffect(() => {
        foucsRef.current.focus()
    }, [])

    const handleIdChange = (e) => {
        setUserId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        loginRequest(userId, password);
    };

    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    }

    const accessToken = Cookies.get('accessToken');

    const loginRequest = async (userId, password) => {
        console.log(Server_IP)
        await axios.post(`${Server_IP}/auth/login`, { userId: userId, userPassword: password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                console.log("성공");
                if (res.data.accessToken) {
                    axios.get(`${Server_IP}/users/me`, {
                        headers: {
                            "Authorization": `Bearer ${res.data.accessToken}`
                        }
                    })
                        .then((userRes) => {
                            console.log(userRes.data)
                            setCookie('accessToken', res.data.accessToken);
                            navigate("/");
                            window.location.reload();
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
            <img className='login-icon' style={{ width: '100px' }} src='/icon.png' />
            <h2 className="login-title">Welcome House Farm</h2> {/* 새로운 요소인 h2 태그를 추가 */}
            <div className="center-container" style={{ display: 'flex', flexDirection: 'column' }}> {/* 새로운 CSS 클래스 추가 */}
                <div className="login-container"> {/* 새로운 CSS 클래스 추가 */}
                    <input type="text" ref={ foucsRef } placeholder="ID" className="input-field" value={ userId } onChange={ handleIdChange } />
                    <input type="password" placeholder="Password" className="input-field" value={password} onChange={handlePasswordChange} onKeyPress={handleOnKeyPress} />
                    {/* <button type="button" className="login-button" style={{ width: '100%' }} onClick={() => handleLogin() }>Login</button> */}
                    <button type="button" className="login-button" style={{ width: '100%' }}  onClick={() => handleLogin() }>Login</button>
                    {/* <button type="button" className="login-button" style={{ width: '100%' }} onClick={() => dispatch(login()) }>로그인</button> */}
                </div>
                <div className='additional-container' style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between'  }}>
                    <FindId style={{ marginRight: '10px' }}></FindId>
                    <FindPassword style={{ marginRight: '10px' }}></FindPassword>
                    <SignUp></SignUp>
                </div>
            </div>
        </>
    );

}