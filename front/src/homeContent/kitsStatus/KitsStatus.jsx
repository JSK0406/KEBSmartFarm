// 여기서 not registered or registered를 기기의 정보에 따라 조건부 렌더링

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deregister } from '../../store/isRegistered';
import DetailStatus from '../detailStatus/DetailStatus';

function KitsStatus() {

  const dispatch = useDispatch();
  const userKitList = useSelector(state => state.userInfo.value.infos.userKitList)

  return (
    <div>
      {userKitList.map((kit, index) => (
          <div key={index} style={{ border: '2px solid black', margin: '10px' }}>
            <p>Kit No: {kit.kitNo}</p>
            <p>Device Name: {kit.deviceName}</p>
            <p>Serial Number: {kit.serialNum}</p>
            <p>Date: {kit.date}</p>
            <DetailStatus></DetailStatus>
          </div>
        ))
      }
    </div>
  )
}

export default KitsStatus
