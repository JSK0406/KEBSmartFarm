import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function SignUp() {

    const [form, setForm] = useState({
        userName: '',
        userId: '',
        userPassword: '',
        userEmail: '',
        userPhoneNum: '',
        userNickname: '',
    })

    const handleSignUp = () => {
        createAccount(form.userName, form.userId, form.userPassword, form.userEmail, form.userPhoneNum, form.userNickname)
    };

    const createAccount = async(userName, userId, userPassword, userEmail, userPhoneNum, userNickname) => {
        await axios.post('serverSignUpurl', { userName: userName, userId: userId, userPassword: userPassword, userEmail: userEmail, userPhoneNum: userPhoneNum, userNickname: userNickname },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            })
            .then((res) => {
                console.log("회원가입 성공");
                alert("회원가입 완료")
            })
            .catch((error) => {
                alert("오류가 발생했습니다. 다시 시도해주세요.");
            })
    } 

    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signUpModal" data-bs-whatever="@getbootstrap">회원가입</button>
            <div className="modal fade" id="signUpModal" tabindex="-1" aria-labelledby="signUpModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ height: '650px' }}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">회원가입</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label" >아이디</label>
                                    <input type="text" className="form-control" id="recipient-id" value={form.userId} onChange={(e) => setForm({...form, userId: e.target.value})} />
                                    <label htmlFor="recipient-name" className="col-form-label" >비밀번호</label>
                                    <input type="password" className="form-control" id="recipient-pw" value={form.userPassword} onChange={(e) => setForm({ ...form, userPassword: e.target.value })} />
                                    <label htmlFor="recipient-name" className="col-form-label" >이름</label>
                                    <input type="text" className="form-control" id="recipient-name" value={form.userName} onChange={(e) => setForm({ ...form, userName: e.target.value })} />
                                    <label htmlFor="recipient-name" className="col-form-label" >이메일</label>
                                    <input type="email" className="form-control" id="recipient-email" value={form.userEmail} onChange={(e) => setForm({ ...form, userEmail: e.target.value })} />
                                    <label htmlFor="recipient-name" className="col-form-label" >전화번호</label>
                                    <input type="tel" className="form-control" id="recipient-phonenum" value={form.userPhoneNum} onChange={(e) => setForm({ ...form, userPhoneNum: e.target.value })} />
                                    <label htmlFor="recipient-name" className="col-form-label" >닉네임</label>
                                    <input type="text" className="form-control" id="recipient-nickname" value={form.userNickname} onChange={(e) => setForm({ ...form, userNickname: e.target.value })} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSignUp}>등록</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default SignUp