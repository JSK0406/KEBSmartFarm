// 요약된 정보가 들어가야 함 

import React from 'react'
import NowGrowth from './NowGrowth'
import NowStatus from './NowStatus'
import Schedule from './Schedule'
import { useDispatch } from 'react-redux';
import { logout } from '../../store/isLoginSlice';
import { deregister } from '../../store/isRegistered';

function Registered() {
    const dispatch = useDispatch(); // action을 dispatch하는 함수 가져오기
    return (
        <div>
            <div className="main-content" style={{ height: '60vh' }}>
                <div className="container-fluid h-100">
                    <div className="row h-100 border border-dark">
                        <div className="col-6 plant-info">
                            {/* Replace with your actual PlantInfo component */}
                            <div>Plant Info Component</div>
                        </div>
                        <div className="col-6 plant-status border border-dark">
                            {/* Replace with your actual PlantStatus component */}
                            <div>Plant Status Component</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="schedule-info border border-dark" style={{ height: '15vh', marginTop: '20px' }}>
                {/* Replace with your actual Schedule component */}
                <div>Schedule Component</div>
            </div>
            <button onClick={() => {dispatch(deregister()); alert("성장이 끝났습니다. 여기에 서버 통신 코드")} }>성장끝</button>
            {/* 현재 사용중인 키트를 비운다는 통신을 해야할듯 */}
            {/* 성장이 끝나면 서버로 끝난 식물의 정보를 추가하면 plantstatus에서는 받기만 하면 됨 */}
        </div>
    )
}

export default Registered
