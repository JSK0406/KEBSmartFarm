import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Cookies } from 'react-cookie'

function FindPassword(props) {

    const [form, setForm] = useState({
        userId: '',
        userEmail: '',
    })

    const handleFindId = () => {
        requestFindId(form.userId, form.userEmail)
    }

    const requestFindId = async (userId, userEmail) => {
        await axios.post('http://165.246.116.52:8080/auth/findPw', { userId: userId, userEmail: userEmail },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(async (res) => {
                await axios.post('http://165.246.116.52:8080/auth/findPw/sendEmail', { userId: userId, userEmail: userEmail },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }).then((res) => {
                        console.log("비밀번호 찾기");
                        alert("이메일로 임시비밀번호가 전송되었습니다.")
                    }).catch((error) => {
                        alert("이메일 전송 과정에서 오류가 생겼습니다.")
                    })
            })
            .catch((error) => {
                alert("입력하신 정보를 다시 확인해주세요.");
            })
    }

    return (
        <div style={{ marginRight: '10px' }}>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#findPasswordModal" data-bs-whatever="@getbootstrap">Find Password</button>
            <div className="modal fade" id="findPasswordModal" tabindex="-1" aria-labelledby="findIdModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ height: '350px' }}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Find Pw</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label" >아이디</label>
                                    <input type="text" className="form-control" id="recipient-name" value={form.userId} onChange={(e) => setForm({ ...form, userId: e.target.value })} />
                                    <label htmlFor="recipient-name" className="col-form-label" >이메일</label>
                                    <input type="email" className="form-control" id="recipient-email" value={form.userEmail} onChange={(e) => setForm({ ...form, userEmail: e.target.value })} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleFindId}>확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default FindPassword