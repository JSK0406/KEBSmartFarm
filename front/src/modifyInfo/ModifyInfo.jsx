import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import Cookies from 'js-cookie';

function ModifyInfo() {

    const accessToken = Cookies.get('accessToken');

    const [form, setForm] = useState({exPassword: '', newPassword: '' })

    const handleChangePassword = () => {
        console.log(form)
        console.log(accessToken);
        requestChangePassword(form.exPassword, form.newPassword)
    }

    const requestChangePassword = async (exPassword, newPassword) => {
        await axios.post('http://165.246.116.52:8080/users/password', { exPassword: exPassword, newPassword: newPassword },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
            })
            .then((res) => {
                alert("비밀번호 변경이 완료되었습니다.")
            })
            .catch((error) => {
                alert("오류가 발생했습니다. 다시 시도해주세요.");
            })
    }

    return (

        <>
            <h2 className="login-title">비밀번호 변경</h2> {/* 새로운 요소인 h2 태그를 추가 */}
            <div className="center-container" style={{ display: 'flex', flexDirection: 'column' }}> {/* 새로운 CSS 클래스 추가 */}
                <div className="login-container"> {/* 새로운 CSS 클래스 추가 */}
                    <input type="password" placeholder="기존 비밀번호" className="input-field" value={form.exPassword} onChange={(e) => setForm({ ...form, exPassword: e.target.value })} />
                    <input type="password" placeholder="변경할 비밀번호" className="input-field" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} />
                    <button type="button" className="login-button" style={{ width: '100%' }} onClick={ handleChangePassword }>비밀번호 변경</button>
                </div>
            </div>
        </>

    )
}

export default ModifyInfo

