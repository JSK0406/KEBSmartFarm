// 기기를 누르면 상세

import React, { useState } from 'react'
import Registered from './registered/Registered';
import NotRegistered from './notRegistered/NotRegistered';
import AddDevice from './AddDevice';

function HomeContent() {

    const [plantRegistered, setPlantRegistered] = useState(false);
    
    if (plantRegistered) {
        return (
            <div>
                <AddDevice></AddDevice>
                <Registered setPlantRegistered={setPlantRegistered} />
            </div>
        )
    } else {
        return (
            <div>
                <AddDevice></AddDevice>
                <NotRegistered setPlantRegistered={setPlantRegistered}/>; // 기기 등록 화면을 보여주는 컴포넌트
            </div>
        )
    }
}

export default HomeContent
