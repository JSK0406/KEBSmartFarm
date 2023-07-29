import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function FindPassword(props) {

    const [form, setForm] = useState({
        userId: '',
        userEmail: '',
    })

    const handleFindId = () => {
        requestFindId(form.userId, form.userEmail)
    }

    const requestFindId = async (userId, userEmail) => {
        await axios.post('serverFindPasswordurl', { userId: userId, userEmail: userEmail },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            })
            .then((res) => {
                console.log("비밀번호 찾기");
                // alert(`당신의 아이디는 ${res.foundId} 입니다.`)
                alert("이메일로 임시비밀번호가 전송되었습니다.")
            })
            .catch((error) => {
                alert("오류가 발생했습니다. 다시 시도해주세요.");
            })
    }

    return (
        <div style={props.style}>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#findPasswordModal" data-bs-whatever="@getbootstrap">비밀번호찾기</button>
            <div className="modal fade" id="findPasswordModal" tabindex="-1" aria-labelledby="findIdModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ height: '350px' }}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">비밀번호 찾기</h1>
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