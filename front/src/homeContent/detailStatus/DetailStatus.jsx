// 요약된 정보가 들어가야 함 

import React, { useState } from 'react'
import NowGrowth from './ThisPlantInfo'
import NowStatus from './NowStatus'
import Schedule from './Schedule'
import { useDispatch } from 'react-redux';
import { logout } from '../../store/isLoginSlice';
import { deregister } from '../../store/isRegistered';
import PlantFinish from './PlantFinish';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import ThisPlantInfo from './ThisPlantInfo';
import DetailPlantStatus from './DetailPlantStatus';
import './detailStatus.css';

function DetailStatus({kit}) {
    const dispatch = useDispatch(); // action을 dispatch하는 함수 가져오기
    const [kitDetail, setKitDetail] = useState();
    const Server_IP = process.env.REACT_APP_Server_IP;
    
    const receiveKitDetail = async () => {
        await axios.get(`${Server_IP}/users/${kit.kitNo}/detail`, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("accessToken")}`
            },
        })
            .then((res) => {
                setKitDetail(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // {/* <div className="col-11 col-lg-6" style={{ border: '10px solid white', height: '100%', borderRadius: '20px', backgroundColor: '#DAE8DA', fontSize: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
    //     {/* Replace with your actual PlantStatus component */}
    //     <div>Plant Status Component</div>
    // </div> */}


    return (
        <div>
            <button type="button" style={{ color: 'white', backgroundColor: '#73BD72' }} className="btn" data-bs-toggle="modal" data-bs-target={`#detailStatusModal${kit.kitNo}`} data-bs-whatever="@getbootstrap">Detail Status</button>
            <div className="modal fade" id={`detailStatusModal${kit.kitNo}`} tabindex="-1" aria-labelledby="findIdModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content" >
                        <div className="modal-header">
                            <span style={{ fontWeight: 'bold', fontSize: '25px', marginLeft: '15px', marginRight: '15px' }}>{kit.plant.plantNickName}</span>
                            <span style={{ fontSize: '20px', color: 'gray', opacity: '80%', marginRight: '10px' }}>{kit.plant.plantName}</span>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="main-content" style={{ border: '5px solid black', minHeight: '80vh', margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ backgroundColor: 'yellow', height: '65vh', width: '98%' }}>
                                <div className='sensorContent' style={{ display: 'flex', height: '40%' }}>
                                    <div style={{ width: '33.3%', border: '1px solid black' }}>온도</div>
                                    <div style={{ width: '33.3%', border: '1px solid black' }}>조도</div>
                                    <div style={{ width: '33.3%', border: '1px solid black' }}>습도</div>
                                </div>
                                <div className='infoContent'>
                                    <DetailPlantStatus kit={kit}></DetailPlantStatus>
                                </div>
                            </div>
                            <div style={{ backgroundColor: 'green', height: '15vh', width: '98%' }}>
                            
                            </div>

                            {/* <div>
                                <div className="row" style={{ width: '150%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div className='row' style={{ height: '80%', width: '97%', display: 'flex', justifyContent: 'center'}}>
                                        <div className='col-12' style={{ border: '10px solid white', padding: '15px', height: '100%', borderRadius: '20px', backgroundColor: '#E9E9E9', lineHeight: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <DetailPlantStatus kit={kit}></DetailPlantStatus>
                                        </div>
                                    </div>
                                    <div className="col-12 plant-status" style={{ }} >
                                        <div style={{ padding: '15px', height: '15vh', margin: '14px', borderRadius: '20px', backgroundColor: '#F8F9F8', fontSize: '20px' }}>
                                            Schedule Component
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <PlantFinish kitNo={kit.kitNo}></PlantFinish>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailStatus
