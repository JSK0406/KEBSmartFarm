import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { fetchUser } from '../store/userInfoSlice';
import Cookies from 'js-cookie';


function AddDevice() {
    const Server_IP = process.env.REACT_APP_Server_IP;
    const dispatch = useDispatch(); // action을 dispatch하는 함수 가져오기
    const [deviceNumber, setDeviceNumber] = useState("");
    const [deviceName, setDeviceName] = useState("");

    

    const handleDeviceNumber = () => {
        const accessToken = Cookies.get('accessToken');
        console.log(deviceNumber)
        console.log(deviceName)
        registerDeviceNumber(deviceNumber, deviceName, accessToken)
        dispatch(fetchUser());
        window.location.reload();
    }

    const registerDeviceNumber = async (deviceNumber, deviceName , accessToken) => {
        await axios.post(`${Server_IP}/users/kit`, { serialNum: deviceNumber, deviceName: deviceName },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        })
        .then((res) => {
            alert("등록 성공")
        })
        .catch((error) => {
            alert("기기번호를 다시 확인해주세요");
        })
    }


    return (
        <div>
            <button style={{ backgroundColor: '#73BD72', color: "white", borderRadius: '30px' }} type="button" className="btn" data-bs-toggle="modal" data-bs-target="#addDevice" data-bs-whatever="@getbootstrap"><FontAwesomeIcon icon={faPlus} /></button>
            <div className="modal fade" id="addDevice" tabindex="-1" aria-labelledby="findModalLabel" aria-hidden="true">
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
                                    <label htmlFor="recipient-name" className="col-form-label" >기기 이름:</label>
                                <input type="text" className="form-control" id="recipient-name" value={deviceName} onChange={(e) => setDeviceName(e.target.value)} />
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