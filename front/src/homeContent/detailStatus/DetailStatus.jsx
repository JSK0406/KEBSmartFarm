// 요약된 정보가 들어가야 함 

import React from 'react'
import NowGrowth from './NowGrowth'
import NowStatus from './NowStatus'
import Schedule from './Schedule'
import { useDispatch } from 'react-redux';
import { logout } from '../../store/isLoginSlice';
import { deregister } from '../../store/isRegistered';

function DetailStatus({kit}) {
    const dispatch = useDispatch(); // action을 dispatch하는 함수 가져오기
    return (
        <div>
        <div>
            <button type="button" style={{ color: 'white', backgroundColor: '#73BD72' }}className="btn" data-bs-toggle="modal" data-bs-target={`#detailStatusModal${kit.kitNo}`} data-bs-whatever="@getbootstrap">Detail Status</button>
            <div className="modal fade" id={`detailStatusModal${kit.kitNo}`} tabindex="-1" aria-labelledby="findIdModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                    <div className="modal-content" >
                            <div>
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">{kit.kitNo} : {kit.kitDeviceName}</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                                <div className="main-content" style={{ height: '80vh', margin: '20px'}}>
                                    <div className="container-fluid h-100">
                                        <div className="row h-100 border border-dark">
                                            <div className="col-lg-6 plant-info">
                                                {/* Replace with your actual PlantInfo component */}
                                                <div>Plant Info Component</div>
                                            </div>
                                            <div className="col-lg-6 plant-status border border-dark">
                                                {/* Replace with your actual PlantStatus component */}
                                                <div>Plant Status Component</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="schedule-info border border-dark" style={{ height: '15vh', margin: '20px' }}>
                                    {/* Replace with your actual Schedule component */}
                                    <div>Schedule Component</div>
                                </div>
                                <button data-bs-dismiss="modal" aria-label="Close" style={{ marginLeft: '20px' }} onClick={() => { dispatch(deregister()); alert("성장이 끝났습니다. 여기에 서버 통신 코드") }}>성장끝</button>
                                <button data-bs-dismiss="modal" aria-label="Close" style={{ marginLeft: '20px' }} onClick={() => { dispatch(deregister()); alert("기기가 삭제되었습니다. 여기에 서버 통신 코드") }}>기기 삭제</button>
                                {/* 현재 사용중인 키트를 비운다는 통신을 해야할듯 */}
                                {/* 성장이 끝나면 서버로 끝난 식물의 정보를 추가하면 plantstatus에서는 받기만 하면 됨 */}
                            </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" >확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default DetailStatus
