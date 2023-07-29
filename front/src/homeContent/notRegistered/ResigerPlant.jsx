import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { register } from '../../store/isRegistered'
import { useDispatch } from 'react-redux'

function RegisterPlant(props) {

    const dispatch = useDispatch();

    const [form, setForm] = useState({
        plantName: '',
        plantNickName: '',
        plantStartDate: '',
    })

    const handleRegister = () => {
        requestRegister(form.plantName, form.plantNickName, form.plantStartDate)
    }

    const requestRegister = async (plantName, plantNickName, plantStartDate) => {
        await axios.post('serverRegisterurl', { plantName: plantName, plantNickName: plantNickName, plantStartDate: plantStartDate },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            })
            .then((res) => {
                console.log("식물 등록");
                dispatch(register());
                alert(`당신의 식물이 등록되었습니다.`)
            })
            .catch((error) => {
                dispatch(register());
                alert("오류가 발생했습니다. 다시 시도해주세요. 테스트 단계라서 통과");
            })
    }

    return (
        <div style={props.style}>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#findIdModal" data-bs-whatever="@getbootstrap">식물 등록</button>
            <div className="modal fade" id="findIdModal" tabindex="-1" aria-labelledby="findIdModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ height: '400px' }}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">식물 등록</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label" >식물 품종</label>
                                    <input type="text" className="form-control" id="recipient-name" value={form.plantName} onChange={(e) => setForm({ ...form, plantName: e.target.value })} />
                                    <label htmlFor="recipient-name" className="col-form-label" >식물 별명</label>
                                    <input type="email" className="form-control" id="recipient-email" value={form.plantNickName} onChange={(e) => setForm({ ...form, plantNickName: e.target.value })} />
                                    <label htmlFor="recipient-name" className="col-form-label" >기르기 시작한 날</label>
                                    <input type="email" className="form-control" id="recipient-email" value={form.plantStartDate} onChange={(e) => setForm({ ...form, plantStartDate: e.target.value })} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleRegister}>확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default RegisterPlant;