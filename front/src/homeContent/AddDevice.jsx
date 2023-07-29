import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function AddDevice() {

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
        .then((res) => {
            console.log("등록성공");
        })
        .catch((error) => {
            console.log(deviceNumber);
            alert("기기번호를 다시 확인해주세요");
        })
    }


    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">기기 등록</button>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <button type="button" className="btn btn-primary" onClick = { handleDeviceNumber }>등록</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default AddDevice