import React from 'react'
import { useState, useRef } from 'react'
import axios from 'axios'
import { register } from '../../../store/isRegistered'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { fetchUser } from '../../../store/userInfoSlice'

function RegisterPlant({kitNo}) {

    const Server_IP = process.env.REACT_APP_Server_IP;
    
    const nameRef = useRef();

    const accessToken = Cookies.get('accessToken');
    const dispatch = useDispatch();

    const [isShowPossibility, setIsShowPossibility] = useState(false);
    const [possibilityObject, setPossibilityObject] = useState({})

    const [form, setForm] = useState({
        plantImage: null,
        plantName: '',
        plantNickName: '',
        plantStartDate: '',
    });

    const handleSendImage = () => {
        console.log(form.plantImage)
        const formData = new FormData();
        formData.append('plantImage', form.plantImage);
        console.log(form.plantImage)

        axios.post('http://165.246.116.154:5000/predict', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            console.log(res.data)
            setPossibilityObject(res.data)  // idx마다 plantName, possibility가 키
            setIsShowPossibility(true)
        })
    }

    const handlePlantNaming = (e) => {
        setForm({ ...form, plantName: e.currentTarget.querySelector('#plantNameContent').textContent });
        console.log(form.plantName)
        setIsShowPossibility(false);
    }

    const handleRegister = () => {
        requestRegister(form.plantName, form.plantNickName)
        dispatch(fetchUser());
        window.location.reload();
    }

    const requestRegister = async (plantName, plantNickName) => {
        await axios.post(`${Server_IP}/users/kit/${kitNo}/plant`, { plantName: plantName, plantNickName: plantNickName },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
            })
            .then((res) => {
                console.log("식물 등록");
                alert(`당신의 식물이 등록되었습니다.`)
            })
            .catch((error) => {
                alert("오류가 발생했습니다. 다시 시도해주세요. 테스트 단계라서 통과");
            })
    }

    return (
        <div>
            <button type="button" style={{ color: 'white', backgroundColor: '#73BD72', paddingLeft: '7px', paddingRight: '7px' }} className="btn" data-bs-toggle="modal" data-bs-target={`#registerPlant${kitNo}Modal`} data-bs-whatever="@getbootstrap">Register Plant</button>
            <div className="modal fade" id={`registerPlant${kitNo}Modal`} tabindex="-1" aria-labelledby="registerPlantLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ height: '400px' }}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">식물 등록</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <img style={{width: '100px', height: '100px'}} src={form.plantImage ? URL.createObjectURL(form.plantImage) : null} class="rounded-circle" alt="..."></img>
                                    {/* <img src={form.plantImage ? URL.createObjectURL(form.plantImage) : null} alt="" /> */}
                                    {/* <p>{form.plantImage}</p> */}
                                    <label htmlFor="recipient-name" className="col-form-label" ><h5>Upload your plant's picture</h5></label>
                                    <input type="file" accept='image/*' onChange={(e) => setForm({ ...form, plantImage: e.target.files[0] })} />
                                    <button type='button' onClick={handleSendImage}>Upload</button>

                                    {isShowPossibility ?
                                        <div>
                                            {Object.entries(possibilityObject).map((value, index) => {
                                                console.log(value)
                                                return (
                                                    <div key={index}>
                                                        <button onClick={handlePlantNaming}>
                                                            <span id='plantNameContent'>{`${value[1].plantName}`}</span>
                                                            <span >&emsp;{`${value[1].possibility.toFixed(3) } %`}</span>
                                                        </button>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    : ''
                                    }
                                    <label htmlFor="recipient-name" className="col-form-label" ><h5>What is your plant</h5></label>
                                    <input type="text" className="form-control" id="recipient-name" value={form.plantName} onChange={(e) => setForm({ ...form, plantName: e.target.value })} />
                                    <label htmlFor="recipient-name" className="col-form-label" >plant's name</label>
                                    <input type="email" className="form-control" id="recipient-email" value={form.plantNickName} onChange={(e) => setForm({ ...form, plantNickName: e.target.value })} />
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