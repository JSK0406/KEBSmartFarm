// 기기를 누르면 상세

import React, { useState } from 'react'
import Registered from './registered/Registered';
import NotRegistered from './notRegistered/NotRegistered';
import AddDevice from './AddDevice';
import { useSelector } from 'react-redux';

function HomeContent() {

    const isConnected = useSelector(state => state.isConnected.value); // 현재 기기연결 상태 가져오기
    const isRegistered = useSelector(state => state.isRegistered.value); // 현재 식물등록 상태 가져오기

    if (isConnected) {
        if (isRegistered) {
            return(
                <div>
                    <Registered/>
                </div>
            )
        } else {
            return (
                <div style={{ display: 'flex', paddingLeft: '20px' }} >
                    <NotRegistered></NotRegistered>
                </div>
            )
        }
    } else {
        return (
            <div style={{ display: 'flex', paddingLeft: '20px' }}>
                <AddDevice></AddDevice>
            </div>
        )
    }

}

export default HomeContent
