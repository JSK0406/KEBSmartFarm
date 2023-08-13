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
        registerDeviceNumber(deviceNumber, deviceName, accessToken)
        dispatch(fetchUser());
        window.location.reload();
    }

    const registerDeviceNumber = async (deviceNumber, deviceName , accessToken) => {
        console.log('기기등록')
        await axios.post(`${Server_IP}/users/kit`, { serialNum: deviceNumber, deviceName: deviceName },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        })
        .then((res) => {
            console.log(res);
            if (res.status === 204) {
                alert("중복");
            } else {
                alert("Success")
            }

        })
        .catch((error) => {
            alert("기기번호를 다시 확인해주세요");
        })
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button style={{
                backgroundColor: '#73BD72',
                color: "white",
                borderRadius: '50px',
                position: 'fixed',
                width: '100px',
                height: '40px',
                bottom: '30px',
                marginRight: '10px',
                fontSize: '15px',
                fontWeight: 'bold',
                zIndex: '500',
            }} type="button" className="btn" data-bs-toggle="modal" data-bs-target="#addDevice" data-bs-whatever="@getbootstrap"><FontAwesomeIcon icon={faPlus} /> Device</button>
            <div className="modal fade" id="addDevice" tabindex="-1" aria-labelledby="findModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ height: '500px'  }}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Device</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label" >Device SerialNumber:</label>
                                <input type="text" className="form-control" id="recipient-name" value={deviceNumber} onChange={(e) => setDeviceNumber(e.target.value)} />
                                    <label htmlFor="recipient-name" className="col-form-label" >Device Name:</label>
                                <input type="text" className="form-control" id="recipient-name" value={deviceName} onChange={(e) => setDeviceName(e.target.value)} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', scale: '200%', marginTop: '70px' }}>
                                    <img src='/Aimg.png' width='50px' height='50px' />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button style={{ backgroundColor: '#73BD72', color: 'white' }} type="button" className="btn" data-bs-dismiss="modal" onClick = { handleDeviceNumber }>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default AddDevice