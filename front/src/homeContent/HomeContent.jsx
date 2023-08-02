// 기기를 누르면 상세

import React, { useEffect, useState } from 'react'
import Registered from './registered/Registered';
import NotRegistered from './notRegistered/NotRegistered';
import AddDevice from './AddDevice';
import { connect } from '../store/isConnectedSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import KitsStatus from './kitsStatus/KitsStatus';

function HomeContent() {

    const isConnected = useSelector(state => state.isConnected.value); // 현재 기기연결 상태 가져오기
    const isRegistered = useSelector(state => state.isRegistered.value); // 현재 식물등록 상태 가져오기
    const userKitList = useSelector(state => state.userInfo.value.infos.userKitList)
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (userKitList.length > 0) {
    //         dispatch(connect());
    //     }
    // }, [userKitList])

    // useEffect(() => {
    //     if (userplant?)
    // })

    // if (isConnected) {
    //     if (isRegistered) {
    //         return(
    //             <div>
    //                 <Registered/>
    //             </div>
    //         )
    //     } else {
    //         return (
    //             <div style={{ display: 'flex', paddingLeft: '20px' }} >
    //                 <NotRegistered></NotRegistered>
    //             </div>
    //         )
    //     }
    // } else {
    //     return (
    //         <div style={{ display: 'flex', paddingLeft: '20px' }}>
    //             <AddDevice></AddDevice>
    //         </div>
    //     )
    // }
    return(
        <div>
            <div>
                <AddDevice></AddDevice>
            </div>
            <KitsStatus/>
        </div>
    )

}

export default HomeContent
