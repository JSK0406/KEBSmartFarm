import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function SignUp() {

    const Server_IP = process.env.Server_IP

    const [form, setForm] = useState({
        userName: '',
        userId: '',
        userPassword: '',
        userEmail: '',
        userPhoneNum: '',
        userNickname: '',
    })

    const handleSignUp = () => {
        let alertMsg = '';
        alertMsg += !form.userEmail.includes('@') ? '이메일에는 @ 기호가 포함되어야 합니다.\n\n':'';
        alertMsg += !/^\d{3}-\d{4}-\d{4}$/.test(form.userPhoneNum) ? '전화번호는 000-0000-0000 형태여야 합니다.':'';
        console.log(alertMsg);
        if (!alertMsg) {
            createAccount(form.userName, form.userId, form.userPassword, form.userEmail, form.userPhoneNum, form.userNickname)
        } else {
            alert(alertMsg)
        }
    };

    const createAccount = async(userName, userId, userPassword, userEmail, userPhoneNum, userNickname) => {
        await axios.post(`${Server_IP}/auth/join`, { userName: userName, userId: userId, userPassword: userPassword, userEmail: userEmail, userPhoneNum: userPhoneNum, userNickname: userNickname },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                alert("Succeess")
            })
            .catch((error) => {
                alert("오류가 발생했습니다. 다시 시도해주세요.");
            })
    } 

    return (
        <div>
            <button style={{ border: 'none', backgroundColor: '#5B8C5A', padding: '7px 20px 7px 20px' }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signUpModal" data-bs-whatever="@getbootstrap">Sign Up</button>
            <div className="modal fade" id="signUpModal" tabindex="-1" aria-labelledby="signUpModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ height: '650px' }}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Sign Up</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label" >ID</label>
                                    <input type="text" className="form-control" id="recipient-id" value={form.userId} onChange={(e) => setForm({...form, userId: e.target.value})} />
                                    <label htmlFor="recipient-name" className="col-form-label" >Password</label>
                                    <input type="password" className="form-control" id="recipient-pw" value={form.userPassword} onChange={(e) => setForm({ ...form, userPassword: e.target.value })} />
                                    <label htmlFor="recipient-name" className="col-form-label" >Name</label>
                                    <input type="text" className="form-control" id="recipient-name" value={form.userName} onChange={(e) => setForm({ ...form, userName: e.target.value })} />
                                    <label htmlFor="recipient-name" className="col-form-label" >E-mail</label>
                                    <input type="email" className="form-control" id="recipient-email" value={form.userEmail} onChange={(e) => setForm({ ...form, userEmail: e.target.value })} />
                                    <label htmlFor="recipient-name" className="col-form-label" >Phone number</label>
                                    <input type="tel" className="form-control" id="recipient-phonenum" value={form.userPhoneNum} onChange={(e) => setForm({ ...form, userPhoneNum: e.target.value })} />
                                    <label htmlFor="recipient-name" className="col-form-label" >Nickname</label>
                                    <input type="text" className="form-control" id="recipient-nickname" value={form.userNickname} onChange={(e) => setForm({ ...form, userNickname: e.target.value })} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSignUp}>Sumbit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default SignUp