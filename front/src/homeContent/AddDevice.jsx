import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { connect } from '../store/isConnectedSlice';
import { useDispatch } from 'react-redux';

function AddDevice() {
    
    const dispatch = useDispatch(); // action을 dispatch하는 함수 가져오기
    const [deviceNumber, setDeviceNumber] = useState("");

    const handleDeviceNumber = () => {
        const accessToken = localStorage.getItem("accessToken")
        registerDeviceNumber(deviceNumber, accessToken)
    }

    const registerDeviceNumber = async (deviceNumber, accessToken) => {
        console.log(deviceNumber);
        await axios.post('serverDeviceurl', { deviceNumber: deviceNumber },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer ${accessToken}"
            },
            withCredentials: true
        })
        .then((res) => { // 여기서 res에 이미 1대를 추가했습니다. 띄우면 좋을듯
            dispatch(connect())
            console.log("등록성공");
        })
        .catch((error) => {
            console.log(deviceNumber);
            dispatch(connect())
            alert("기기번호를 다시 확인해주세요 일단은 테스트 단계에서 connect처리");
        })
    }


    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">기기 등록</button>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="findModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ height: '500px'  }}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">기기 등록</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label" >기기 일련번호:</label>
                                <input type="text" className="form-control" id="recipient-name" value={deviceNumber} onChange={(e) => setDeviceNumber(e.target.value)} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', scale: '200%', marginTop: '70px' }}>
                                    <img src='/Aimg.png' width='50px' height='50px' />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick = { handleDeviceNumber }>등록</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default AddDevice