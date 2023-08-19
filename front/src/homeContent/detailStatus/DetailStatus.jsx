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
import TempSensor from './sensorGraph/TempSensor';
import IlluminanceSensor from './sensorGraph/IlluminanceSensor';
import HumiditySensor from './sensorGraph/HumiditySensor';
import MoistureSensor from './sensorGraph/MoistureSensor';
import Timeline from './sensorGraph/Timeline';
import LightBtn from './LightBtn';
import WaterBtn from './WaterBtn';

function DetailStatus({ kit }) {
    const dispatch = useDispatch(); // action을 dispatch하는 함수 가져오기
    const [kitDetail, setKitDetail] = useState();
    const Server_IP = process.env.REACT_APP_Server_IP;
    const [plantDetail, setPlantDetail] = useState({});

    const dateDifference = (givenDate) => {
        const formattedDate = givenDate.split(' ')[0]; // "2023-08-09"
        const date1 = new Date(formattedDate);
        const date2 = new Date(); // 현재 날짜

        // 두 날짜의 차이를 밀리초 단위로 계산
        const differenceInTime = date2 - date1;

        // 밀리초를 일로 변환
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        return (Math.floor(differenceInDays) + 1)
    }

    useEffect(() => {
        receivePlantDetail();
        receiveKitDetail();
    }, []);

    const receivePlantDetail = async () => {
        try {
            const res = await axios.get('/plantInfoData.json');
            setPlantDetail(res.data[kit.plant.plantName]);
        } catch (err) {
            console.error("Error fetching plant data:", err);
        }
    }

    const receiveKitDetail = async () => {
        console.log(kit.plant.plantRegDate.split(".")[0].replace("T", " "));
        await axios.get(`${Server_IP}/kit/${kit.kitNo}/details`, { regDate: kit.plant.plantRegDate.split("+")[0].replace("T", " ") }, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("accessToken")}`
            },
        })
            .then((res) => {
                console.log(res.data);
                setKitDetail(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <div>
            <button type="button" style={{ color: 'white', backgroundColor: '#73BD72' }} className="btn" data-bs-toggle="modal" data-bs-target={`#detailStatusModal${kit.kitNo}`} data-bs-whatever="@getbootstrap">Detail Status</button>
            <div className="modal fade" id={`detailStatusModal${kit.kitNo}`} tabindex="-1" aria-labelledby="findIdModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content" >
                        <div className="modal-header">
                            <span style={{ fontWeight: '1000', fontSize: '25px', marginLeft: '15px', marginRight: '15px' }}>{kit.plant.plantNickName}</span>
                            <span style={{ fontSize: '20px', color: 'gray', opacity: '80%', marginRight: '10px' }}>{kit.plant.plantName}</span>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {/* <div className="main-content" style={{ height: '80vh', minHeight: '60vh', margin: '10px 20px 20px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}> */}
                        <div className="main-content" style={{ minHeight: '60vh', margin: '10px 20px 20px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ fontWeight: '500', fontSize: '20px', marginBottom: '0', marginTop: '10px', alignSelf: 'flex-start', marginLeft: '8px' }}> Now Status</p>
                            <div style={{ width: '98%' }}>
                                <div className='sensorContent' style={{ display: 'flex', height: '40%', backgroundColor: '#F8F9F8', borderRadius: '20px' }}>
                                    <div style={{ width: '33.3%' }}>
                                        <TempSensor plantDetail={ plantDetail }></TempSensor>
                                    </div>
                                    <div style={{ width: '33.3%'}}>
                                        <IlluminanceSensor plantDetail={ plantDetail }></IlluminanceSensor>
                                    </div>
                                    <div style={{ width: '33.3%'}}>
                                        <HumiditySensor plantDetail={ plantDetail }></HumiditySensor>
                                    </div>
                                </div>
                                <p style={{ fontWeight: '500', fontSize: '20px', marginBottom: '0', marginTop: '10px', alignSelf: 'flex-start', marginLeft: '2px' }}> Information</p>
                                <div className='infoContent' style={{ backgroundColor: '#F8F9F8', borderRadius: '20px', height: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10px' }}>
                                    <div className='detailPlantStatus'>
                                        <DetailPlantStatus kit={kit}></DetailPlantStatus>
                                    </div>
                                </div>
                                <p style={{ fontWeight: '500', fontSize: '20px', marginBottom: '0', marginTop: '10px', alignSelf: 'flex-start', marginLeft: '2px' }}> Watering Schedule</p>
                                <div className='infoContent' style={{ backgroundColor: '#F8F9F8', borderRadius: '20px', height: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10px' }}>
                                    <div className='detailPlantStatus' style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div style={{ width: '90%', fontSize: '20px', display: 'flex' }}>
                                            <Timeline></Timeline>
                                        </div>
                                        <div style={{ margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
                                            <WaterBtn kitNo={kit.kitNo}></WaterBtn>
                                            <LightBtn kitNo={kit.kitNo}></LightBtn>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
