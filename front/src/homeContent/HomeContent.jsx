// 기기를 누르면 상세

import React, { useEffect, useState } from 'react'
import AddDevice from './AddDevice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import KitsStatus from './kitsStatus/KitsStatus';

function HomeContent() {

    const isConnected = useSelector(state => state.isConnected.value); // 현재 기기연결 상태 가져오기
    const isRegistered = useSelector(state => state.isRegistered.value); // 현재 식물등록 상태 가져오기
    const userKitList = useSelector(state => state.userInfo.value.infos.userKitList)
    const dispatch = useDispatch();

    return(
        <div>
            <div style={{ marginTop: '20px'}}>
                <AddDevice></AddDevice>
            </div>
            <div style={{marginLeft: '17px', marginRight: '17px'}}>
                <KitsStatus/>
            </div>
        </div>
    )

}

export default HomeContent
