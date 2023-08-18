// 기기를 누르면 상세

import React, { useEffect, useState } from 'react'
import AddDevice from './AddDevice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import KitsStatus from './kitsStatus/KitsStatus';
import axios from 'axios';
import HelpBtn from '../component/HelpBtn';
import IntroHome from '../introContent/IntroHome';

function HomeContent() {

    const isConnected = useSelector(state => state.isConnected.value); // 현재 기기연결 상태 가져오기
    const isRegistered = useSelector(state => state.isRegistered.value); // 현재 식물등록 상태 가져오기
    const userKitList = useSelector(state => state.userInfo.value.infos.userKitList)
    const dispatch = useDispatch();

    const [image, setImage] = useState('');

    return(
        <div>
            <div style={{ display:'flex', alignItems: 'center' }}>
                <div className='col-11 col-lg-10' style={{ justifyContent:'right', margin: '0 auto' }}>
                    <AddDevice></AddDevice>
                    {/* <HelpBtn Content={IntroHome} pageName={'Home'}></HelpBtn> */}
                </div>
            </div>

            <div className='col-11 col-lg-10' style={{ margin: '0 auto', display: 'flex', flexDirection: 'column'}}>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '0', padding: '0' }}>
                    <KitsStatus/>
                </div>
            </div>
        </div>
    )

}

export default HomeContent
