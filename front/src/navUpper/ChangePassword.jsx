// import React from 'react'
// import { useState } from 'react'
// import axios from 'axios'
// import { useCookies } from 'react-cookie'

// function ChangePassword() {

//     const [form, setForm] = useState({ userId: '', exPassword: '', newPassword: '' })
//     const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

//     const handleChangePassword = () => {
//         console.log(form)
//         console.log(cookies.accessToken)
//         requestChangePassword(form.userId, form.exPassword, form.newPassword)
//     }

//     const requestChangePassword = async (userId, exPassword, newPassword) => {
//         await axios.post('http://165.246.116.164:8080/users/password', { userId: userId, exPassword: exPassword, newPassword: newPassword },
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${cookies.accessToken}`
//                 },
//             })
//             .then((res) => {
//                 alert("비밀번호 변경이 완료되었습니다.")
//             })
//             .catch((error) => {
//                 alert("오류가 발생했습니다. 다시 시도해주세요.");
//             })
//     }

//     return (
//         <div>
//             <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#changePwModal" data-bs-whatever="@getbootstrap">비밀번호 변경</button>
//             <div className="modal fade" id="changePwModal" tabindex="-1" aria-labelledby="changePwModalLabel" aria-hidden="true">
//                 <div className="modal-dialog modal-dialog-custom">
//                     <div className="modal-content" style={{ height: '350px' }}>
//                         <div className="modal-header">
//                             <h1 className="modal-title fs-5" id="changePwModalLabel">비밀번호 변경</h1>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             <form>
//                                 <div className="mb-3">
//                                     <label htmlFor="recipient-name" className="col-form-label">아이디</label>
//                                     <input type="text" className="form-control" id="recipient-name" value={form.userId} onChange={(e) => setForm({ ...form, userId: e.target.value })} />
//                                     <label htmlFor="recipient-name" className="col-form-label">변경 전 비밀번호</label>
//                                     <input type="text" className="form-control" id="recipient-name" value={form.exPassword} onChange={(e) => setForm({ ...form, exPassword: e.target.value })} />
//                                     <label htmlFor="recipient-name" className="col-form-label">변경 후 비밀번호</label>
//                                     <input type="text" className="form-control" id="recipient-name" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} />
//                                 </div>
//                             </form>
//                         </div>
//                         <div className="modal-footer">
//                             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                             <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleChangePassword}>변경</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default ChangePassword